from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    try:
        if request.method == 'POST':
            data = request.json
            # Sahi syntax: .get('key', default_value)
            new_item = Product(
                name=data.get('name'), 
                qty=int(data.get('qty', 0)), 
                price=float(data.get('price', 0))
            )
            db.session.add(new_item)
            db.session.commit()
            return jsonify({"msg": "Product Added!"}), 201
    
        # GET request: Saare products fetch karein
        products = Product.query.all()
        return jsonify([{"id":p.id, "name":p.name, "qty":p.qty, "price":p.price} for p in products])
        
    except Exception as e:
        # Terminal mein check karein exact error kya hai
        print(f"Backend Error: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try: 
        product = Product.query.get(id)
        if product:
            db.session.delete(product)
            db.session.commit()
            return jsonify({"msg": "Product Deleted!"}), 200
        return jsonify({"msg": "Product not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:id>', methods= ['PUT'])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify ({"msg": "Product not found"}), 404
    
    data = request.json
    product.name = data.get('name', product.name)
    product.qty = int(data.get('qty', product.qty))
    product.price = float(data.get('price', product.price))

    db.session.commit()
    return jsonify({"msg": "Product Updated!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)