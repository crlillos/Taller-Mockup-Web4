from flask import Flask, render_template, request, redirect, url_for
import firebase_admin
from firebase_admin import credentials, firestore, auth

cred = credentials.Certificate("llave.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return "<h1>Página de Registro</h1><p>Estado: Esperando diseño</p>"

@app.route('/perfil')
def perfil():
    return "<h1>Perfil del Usuario</h1><p>Estado: Conexión en proceso</p>"

@app.route('/reservas', methods=['GET', 'POST'])

def reservas():

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



        return "<h1>¡Reserva enviada!</h1><p>Los datos ya están en Firebase.</p><a href='/reservas'>Volver</a>"



    return render_template('reserva.html')

if __name__ == '__main__':
    app.run(debug=True)