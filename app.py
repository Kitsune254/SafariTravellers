from flask import Flask, render_template, request, session, redirect, url_for
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=7)

db = SQLAlchemy(app)

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/account')
def account():
    # if 'user' not in session:
    #     return redirect(url_for('login'))
    return render_template('account.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Process signup logic here
        user = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        session['user'] = user

        saved_user = users.query.filter_by(name=user, email=email).first()
        if saved_user:
            return login()
        else:
            usr = users(name=user, email=email, password=password)
            db.session.add(usr)
            db.session.commit()
            return redirect(url_for('home'))
    else:
        if 'user' in session:
            return redirect(url_for('home'))
        return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Process login logic here
        email = request.form['email']
        password = request.form['password']
        saved_user = users.query.filter_by(email=email, password=password).first()
        if saved_user:
            session['user'] = saved_user.name
            return redirect(url_for('home'))
    else:
        if 'user' in session:
            return redirect(url_for('home'))
        return render_template('login.html')
    
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)