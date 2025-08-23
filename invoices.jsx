import React , {usestate} from  "react";
function App()
{
    const [ invoices, setInvoices] = useState([]);
    const [ summary, setSummary] = useState({});
    const [highValue, setHighValue] = useState([]);
    
    // fetch invoices
    const fetchInvoices = async () => {
        try {
            const res = await fetch("https://localhost:5000/invoices");
            const data = await res.json();
            setInvoices(data);
        } catch (error) {
            alert("API is down !");
        }
    };
     // fetch summary
     const fetchSummary = async () => {
        const res = await fetch("https://localhost:5000/api/summary");
        const data = await res.json();
        setSummary(data);
     };
     // fetch high value invoices
     const fetchHighValueInvoices = async () => {
         const res = await fetch("https://localhost:5000/api/ai-suggest");
         const data = await res.json();
         setHighValue(data);
     };

     return (
        <div style={{ padding: "20px" }}>
            <h1>Invoice Dashboard</h1>
            <button onClick={fetchInvoices}>Fetch Invoices</button>
            <button onClick={fetchSummary}>Get Summary</button>
            <button onClick={fetchHighValueInvoices}>Suggest High Value Invoices</button>
            {
                /* INVOICES TABLE */
            }
            <h2>Invoices </h2>
            <table border="1" cellpadding="10">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Airline</th>
                        <th>Amount</th>
                        <th>GSTIN</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.date}</td>
                            <td>{invoice.airline}</td>
                            <td>{invoice.amount}</td>
                            <td>{invoice.gstin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* summary */}
            <h2>summary</h2>
            <ul>
                {Object.entries(summary).map(([airline,total]) => (
                    <li key={airline}>
                        {airline}: INR{total}
                    </li>
                ))}
            </ul>

            <h2>High Value Invoices ( &gt;10000 )</h2>
            <ul>
                {highValue.map((inv) => (
                    <li key={inv.id}>
                        {inv.airline}: {"\u20B9"}{inv.amount}
                    </li>
                ))}
            </ul>



            </div>
     );
    }
    export default App;