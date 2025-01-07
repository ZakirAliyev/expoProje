import './index.scss';
import { Helmet } from "react-helmet-async";
import { useGetAllOrdersByUserQuery } from "../../services/usersApi.jsx";
import { useState } from "react";

function Orders() {
    const { data: getAllOrdersByUser } = useGetAllOrdersByUserQuery();
    const orders = getAllOrdersByUser?.data;
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleAccordion = (orderId) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
    };

    return (
        <section id={"orders"}>
            <Helmet>
                <title>Sifarişlərim</title>
            </Helmet>
            <div className="container">
                <h2 className={"h2"}>Sifarişlərim</h2>
                <div className={"lineWrapper"}>
                    <div className={"greenLine"}></div>
                </div>
                {orders?.length > 0 ? (
                    <table className="orders-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tarix</th>
                            <th>Status</th>
                            <th>Ümumi Məbləğ</th>
                            <th>Məhsullar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <>
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>{order.status}</td>
                                    <td>{order.totalPrice.toFixed(2)} AZN</td>
                                    <td>
                                        <button
                                            className="toggle-button"
                                            onClick={() => toggleAccordion(order.id)}
                                        >
                                            {expandedOrderId === order.id ? "Bağla" : "Aç"}
                                        </button>
                                    </td>
                                </tr>
                                {expandedOrderId === order.id && (
                                    <tr className="accordion-content">
                                        <td colSpan="6">
                                            <ul>
                                                {order.orderItems.map((item) => (
                                                    <li key={item.productId}>
                                                        {item.product.name} - {item.count} ədəd - {item.price} AZN
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Sifariş yoxdur.</p>
                )}
            </div>
        </section>
    );
}

export default Orders;
