import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
    usePutCancelOrderMutation,
    usePutConfirmOrderMutation
} from "../../services/usersApi.jsx";
import {Table} from "antd";
import {FaCheckCircle, FaTimesCircle, FaTrash} from "react-icons/fa";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {data: getAllOrders, refetch} = useGetAllOrdersQuery();
    const orders = getAllOrders?.data;

    const [putCancelOrder, {isLoading: isCanceling}] = usePutCancelOrderMutation();
    const [putConfirmOrder, {isLoading: isConfirming}] = usePutConfirmOrderMutation();
    const [deleteOrder, {isLoading: isDeleting}] = useDeleteOrderMutation();

    const filteredOrders = {
        pending: orders?.filter(order => order.status === 'Pending') || [],
        accepted: orders?.filter(order => order.status === 'Confirmed') || [],
        cancelled: orders?.filter(order => order.status === 'Cancelled') || [],
    };

    const handleAction = async (action, id) => {
        try {
            if (action === "confirm") {
                await putConfirmOrder(id).unwrap();
            } else if (action === "cancel") {
                await putCancelOrder(id).unwrap();
            } else if (action === "delete") {
                await deleteOrder(id).unwrap();
            }
            refetch();
        } catch (error) {
            console.error("Error performing action:", error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ad',
            dataIndex: 'appUserFullName',
            key: 'appUserFullName',
            render: (appUserFullName) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{appUserFullName}</span>,
        },
        {
            title: 'Mobil nömrə',
            dataIndex: 'appUserPhoneNumber',
            key: 'appUserPhoneNumber',
            render: (appUserPhoneNumber) => <span
                style={{color: '#454545', fontWeight: '600'}}>{appUserPhoneNumber}</span>,
        },
        {
            title: 'Məhsul sayı',
            dataIndex: 'orderItems',
            key: 'orderItems',
            render: (orderItems) => <span style={{color: '#454545', fontWeight: '600'}}>{orderItems.length}</span>,
        },
        {
            title: 'Qiymət',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => <span style={{color: '#454545', fontWeight: '600'}}>{totalPrice} AZN</span>,
        },
        {
            title: 'Ödənilib',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (
                isPaid ? <FaCheckCircle style={{color: 'green'}}/> : <FaTimesCircle style={{color: 'red'}}/>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{status}</span>,
        },
        {
            title: 'Əməliyyatlar',
            key: 'actions',
            render: (_, record) => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    {record.status === 'Pending' && (
                        <>
                            <button
                                className={"yesnobtn"}
                                onClick={() => handleAction("confirm", record.id)}
                                disabled={isConfirming}
                            >
                                <FaCheckCircle/>
                            </button>
                            <button
                                className={"yesnobtn1"}
                                onClick={() => handleAction("cancel", record.id)}
                                disabled={isCanceling}
                            >
                                <FaTimesCircle/>
                            </button>
                        </>
                    )}
                    <button
                        className={"yesnobtn2"}
                        onClick={() => handleAction("delete", record.id)}
                        disabled={isDeleting}
                    >
                        <FaTrash/>
                    </button>
                </div>
            )
        }
    ];

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Gözləmədə" {...a11yProps(0)} />
                    <Tab label="Qəbul edilib" {...a11yProps(1)} />
                    <Tab label="Rədd edilib" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Table columns={columns} dataSource={filteredOrders.pending} rowKey="id" expandable={{
                    expandedRowRender: (record) => (
                        <ul>
                            <h3>Məhsullar :</h3>
                            {record.orderItems.map((item, index) => (
                                <li style={{listStyle: 'none'}}
                                    key={index}>
                                    <span style={{
                                        color: '#0DA5B5',
                                        fontWeight: 'bold'
                                    }}>{item.product?.name} </span>
                                    - {item.count} x {item.price} AZN</li>
                            ))}
                            <span className={"addButton111"}>Ünvan: {record?.appUserAddress}</span>
                        </ul>
                    ),
                    rowExpandable: record => record.orderItems.length > 0,
                }} pagination={{pageSize: 5}}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Table columns={columns} dataSource={filteredOrders.accepted} rowKey="id" expandable={{
                    expandedRowRender: (record) => (
                        <ul>
                            <h3>Məhsullar :</h3>
                            {record.orderItems.map((item, index) => (
                                <li style={{listStyle: 'none'}}
                                    key={index}>
                                    <span style={{
                                        color: '#0DA5B5',
                                        fontWeight: 'bold'
                                    }}>{item.product?.name} </span>
                                    - {item.count} x {item.price} AZN</li>
                            ))}
                            <span className={"addButton111"}>Ünvan: {record?.appUserAddress}</span>
                        </ul>
                    ),
                    rowExpandable: record => record.orderItems.length > 0,
                }} pagination={{pageSize: 5}}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Table columns={columns} dataSource={filteredOrders.cancelled} rowKey="id" expandable={{
                    expandedRowRender: (record) => (
                        <ul>
                            <h3>Məhsullar :</h3>
                            {record.orderItems.map((item, index) => (
                                <li style={{listStyle: 'none'}}
                                    key={index}>
                                    <span style={{
                                        color: '#0DA5B5',
                                        fontWeight: 'bold'
                                    }}>{item.product?.name} </span>
                                    - {item.count} x {item.price} AZN</li>
                            ))}
                            <span className={"addButton111"}>Ünvan: {record?.appUserAddress}</span>
                        </ul>
                    ),
                    rowExpandable: record => record.orderItems.length > 0,
                }} pagination={{pageSize: 5}}/>
            </CustomTabPanel>
        </Box>
    );
}
