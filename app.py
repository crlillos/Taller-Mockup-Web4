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

        usuarios_ref = db.collection('usuarios')
        query = usuarios_ref.where('email', '==', email).where('password', '==', password).stream()
        
        usuario_encontrado = None
        for doc in query:
            usuario_encontrado = doc.to_dict()
            usuario_encontrado['id'] = doc.id

        if usuario_encontrado:
            session['user_id'] = usuario_encontrado['id']
            session['user_email'] = usuario_encontrado['email']
            flash("¡Sesión iniciada correctamente!")
            return redirect(url_for('inicio'))
        else:
            return render_template('login.html', error="Correo o contraseña incorrectos")

    return render_template('login.html')

@app.route('/perfil')
def perfil():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    return f"""
    <div style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1>¡Hola, {session['user_email']}!</h1>
        <p>Has entrado correctamente a tu zona privada.</p>
        <a href="/logout" style="color: #ff5722; text-decoration: none; font-weight: bold;">Cerrar sesión</a>
        <br><br>
        <a href="/" style="color: #666;">Volver al taller</a>
    </div>
    """

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

        db.collection('citas').add({
            'cliente': nombre,
            'telefono': telefono,
            'fecha': fecha,
            'servicio': servicio,
            'problema': problema,
            'estado': 'pendiente'
        })
        flash("¡Reserva enviada con éxito! Te contactaremos en breve.")
        return redirect(url_for('inicio'))

    return render_template('reserva.html')

if __name__ == '__main__':
    app.run(debug=True)