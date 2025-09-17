"use client";

import React, { useState } from "react";
import { Table, Tag, Space, Input, DatePicker, Select, Button, Popconfirm, message } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;

const History = () => {
  const [historyData, setHistoryData] = useState([
    {
      key: 1,
      date: "2025-04-01",
      eventType: "donation_request",
      event: "Food Donation Request",
      farmerName: "John Smith",
      farmerLocation: "Springfield, IL",
      ngoName: "Hunger Relief",
      ngoLocation: "Chicago, IL",
      details: "200kg of rice",
      status: "completed",
      deliveryDate: "2025-04-03",
    },
    {
      key: 2,
      date: "2025-04-03",
      eventType: "donation_success",
      event: "Food Donation Delivered",
      farmerName: "John Smith",
      farmerLocation: "Springfield, IL",
      ngoName: "Hunger Relief",
      ngoLocation: "Chicago, IL",
      details: "200kg of rice successfully delivered",
      status: "completed",
      deliveryDate: "2025-04-03",
    },
    {
      key: 3,
      date: "2025-04-05",
      eventType: "request_canceled",
      event: "Food Request Canceled",
      farmerName: "Mary Johnson",
      farmerLocation: "Peoria, IL",
      ngoName: "Food for All",
      ngoLocation: "Rockford, IL",
      details: "150kg of potatoes",
      status: "canceled",
      deliveryDate: null,
    },
    {
      key: 4,
      date: "2025-04-07",
      eventType: "registration",
      event: "New Farmer Registration",
      farmerName: "Alex Brown",
      farmerLocation: "Bloomington, IL",
      ngoName: null,
      ngoLocation: null,
      details: "New farmer joined the platform",
      status: "completed",
      deliveryDate: null,
    },
    {
      key: 5,
      date: "2025-04-10",
      eventType: "donation_request",
      event: "Vegetable Donation",
      farmerName: "Sarah Wilson",
      farmerLocation: "Decatur, IL",
      ngoName: "Community Kitchen",
      ngoLocation: "Evanston, IL",
      details: "100kg of mixed vegetables",
      status: "pending",
      deliveryDate: "2025-04-15",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleDelete = (key) => {
    setHistoryData(historyData.filter(item => item.key !== key));
    message.success('Record deleted successfully');
  };

  const handleEdit = (record) => {
    // In a real app, you would open a modal/form here
    message.info(`Editing record ${record.key}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'blue';
      case 'canceled': return 'red';
      default: return 'gray';
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Event Type',
      dataIndex: 'event',
      key: 'event',
      filters: [
        { text: 'Donation Request', value: 'donation_request' },
        { text: 'Donation Success', value: 'donation_success' },
        { text: 'Request Canceled', value: 'request_canceled' },
        { text: 'Registration', value: 'registration' },
      ],
      onFilter: (value, record) => record.eventType === value,
      render: (text, record) => (
        <Tag color={getStatusColor(record.status)}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Farmer',
      key: 'farmer',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.farmerName}</div>
          <div className="text-xs text-gray-500">{record.farmerLocation}</div>
        </div>
      ),
    },
    {
      title: 'NGO',
      key: 'ngo',
      render: (_, record) => record.ngoName ? (
        <div>
          <div className="font-medium">{record.ngoName}</div>
          <div className="text-xs text-gray-500">{record.ngoLocation}</div>
        </div>
      ) : <span>-</span>,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text) => text ? <span>{text}</span> : <span>-</span>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Canceled', value: 'canceled' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = historyData.filter(item => {
    // Search filter
    const matchesSearch = 
      item.farmerName.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.ngoName && item.ngoName.toLowerCase().includes(searchText.toLowerCase())) ||
      item.details.toLowerCase().includes(searchText.toLowerCase());

    // Date range filter
    const matchesDate = dateRange.length === 0 || (
      new Date(item.date) >= new Date(dateRange[0]) && 
      new Date(item.date) <= new Date(dateRange[1])
    );

    // Event type filter
    const matchesEvent = eventFilter === 'all' || item.eventType === eventFilter;

    // Status filter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesDate && matchesEvent && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Activity History</h2>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <Input
              placeholder="Search by name or details"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-full md:w-64"
            />
            
            <RangePicker 
              onChange={(dates) => setDateRange(dates ? dates.map(d => d.format('YYYY-MM-DD')) : [])}
              className="w-full md:w-64"
            />
            
            <Select
              placeholder="Filter by event type"
              value={eventFilter}
              onChange={setEventFilter}
              className="w-full md:w-48"
            >
              <Option value="all">All Events</Option>
              <Option value="donation_request">Donation Request</Option>
              <Option value="donation_success">Donation Success</Option>
              <Option value="request_canceled">Request Canceled</Option>
              <Option value="registration">Registration</Option>
            </Select>
            
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full md:w-48"
            >
              <Option value="all">All Statuses</Option>
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
            
            <Button 
              onClick={() => {
                setSearchText("");
                setDateRange([]);
                setEventFilter("all");
                setStatusFilter("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={filteredData} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
            rowClassName={(record) => {
              if (record.status === 'pending') return 'bg-blue-50';
              if (record.status === 'canceled') return 'bg-red-50';
              return '';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default History;