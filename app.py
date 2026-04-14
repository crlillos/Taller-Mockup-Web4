from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
@app.route('/login')
def login():
    return "<h1>Página de Login</h1><p>Estado: Esperando diseño del equipo de Frontend.</p>"
@app.route('/registro')
def registro():
    return "<h1>Página de Registro</h1><p>Estado: Esperando diseño del equipo de Frontend.</p>"
@app.route('/perfil')
def perfil():
    return "<h1>Perfil del Usuario</h1><p>Estado: Conexión con base de datos en proceso.</p>"
@app.route('/reservas')
def reservas():
    return "<h1>Gestión de Reservas</h1><p>Estado: Lógica de servidor preparada.</p>"