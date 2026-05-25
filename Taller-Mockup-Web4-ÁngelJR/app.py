from flask import Flask, render_template, request, redirect, url_for, session, flash
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("llave.json2.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
app.secret_key = 'taller_mockup_clave_segura_123'

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        usuarios_ref = db.collection('Usuarios') 
        query = usuarios_ref.where('email', '==', email).where('password', '==', password).stream()
        
        usuario_encontrado = None
        for doc in query:
            usuario_encontrado = doc.to_dict()
            usuario_encontrado['id'] = doc.id

        if usuario_encontrado:
            session['user_id'] = usuario_encontrado['id']
            session['user_email'] = usuario_encontrado.get('email', '')
            session['rol'] = usuario_encontrado.get('Rol', 'cliente').lower()
            
            flash("¡Sesión iniciada correctamente!")
            
            if session['rol'] == 'admin':
                return redirect(url_for('admin_dashboard'))
            else:
                return redirect(url_for('inicio'))
        else:
            return render_template('login.html', error="Correo o contraseña incorrectos")

    return render_template('login.html')

@app.route('/admin_dashboard')
def admin_dashboard():
    if session.get('rol') != 'admin':
        flash("Acceso denegado. Área exclusiva de administración.")
        return redirect(url_for('inicio'))
        
    citas_ref = db.collection('citas').stream()
    todas_las_citas = []
    for cita in citas_ref:
        cita_data = cita.to_dict()
        cita_data['id'] = cita.id
        todas_las_citas.append(cita_data)
        
    return render_template('admin.html', citas=todas_las_citas)

@app.post("/eliminar_cita/<string:id>")
def eliminar_cita(id):
    db.collection('citas').document(id).delete()
    return redirect('/admin_dashboard')

@app.get("/editar_cita/<string:id>")
def editar_cita(id):
    cita_ref = db.collection('citas').document(id).get()
    cita = cita_ref.to_dict()
    cita['id'] = id
    return render_template("editar_cita.html", cita=cita)

@app.post("/actualizar_cita/<string:id>")
def actualizar_cita(id):
    db.collection('citas').document(id).update({
        "cliente": request.form["cliente"],
        "fecha": request.form["fecha"],
        "servicio": request.form["servicio"],
        "telefono": request.form["telefono"]
    })
    return redirect('/admin_dashboard') 

@app.route('/perfil')
def perfil():
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    user_id = session['user_id']
    citas_ref = db.collection('citas').where('user_id', '==', user_id).stream()
    mis_citas = []
    for cita in citas_ref:
        cita_data = cita.to_dict()
        cita_data['id'] = cita.id
        mis_citas.append(cita_data)
        
    return render_template('perfil.html', citas=mis_citas)

@app.route('/logout')
def logout():
    session.clear()
    flash("Has cerrado sesión.")
    return redirect(url_for('inicio'))

@app.route('/reservas', methods=['GET', 'POST'])
def reserva():
    if request.method == 'POST':
        nombre = request.form.get('nombre_cliente')
        telefono = request.form.get('telefono_cliente')
        fecha = request.form.get('fecha_cita')
        servicio = request.form.get('tipo_servicio')
        problema = request.form.get('descripcion_problema')
        
        user_id = session.get('user_id', 'invitado')

        db.collection('citas').add({
            'cliente': nombre,
            'telefono': telefono,
            'fecha': fecha,
            'servicio': servicio,
            'problema': problema,
            'estado': 'pendiente',
            'user_id': user_id
        })
        flash("¡Reserva enviada con éxito! Te contactaremos en breve.")
        return redirect(url_for('inicio'))

    return render_template('reserva.html')

if __name__ == '__main__':
    app.run(debug=True)