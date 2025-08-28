from flask import Flask , jsonify
app = Flask(__name__)

#dummy invoice data
invoices=[
    {
        "inovoiceNo": "INV001","date":"2025-08-20","airline":"IndiGo","amount":4500,"gstin":"29ABCDE1234F1Z5"
    },
    {
        "inovoiceNo": "INV002","date":"2025-08-21","airline":"Air India","amount":1200,"gstin":"29ABCDE1234F1Z5"
    },
    {
        "inovoiceNo": "INV003","date":"2025-08-22","airline":"Vistara","amount":5600,"gstin":"29ABCDE1234F1Z5"
    },
    {
        "inovoiceNo": "INV004","date":"2025-08-23","airline":"IndiGo","amount":9500,"gstin":"29ABCDE1234F1Z5"
    },
    {
        "inovoiceNo": "INV005","date":"2025-08-24","airline":"Air India","amount":20000,"gstin":"29ABCDE1234F1Z5"
    },
]

#API 1: Get invoices
@app.route("/api/invoices",
            methods=["GET"])
def get_invoices():
    return jsonify(invoices)
#API 2: Get  airline-wise summary
@app.route("/api/invoices/summary",
            methods=["GET"])
def get_summary():
    summary = {}
    for inv in invoices:
        summary[inv["airline"]] = summary.get(inv["airline"], 0) + inv["amount"]
    return jsonify(summary)
#API 3:AI suggest (High - value invoices > 10000)
@app.route("/api/invoices/suggest",
            methods=["GET"])
def ai_suggest():
    high_value = [ inv for inv in invoices if inv["amount"] > 10000]
    return jsonify(high_value)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
