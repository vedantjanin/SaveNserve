"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Tag, Input, Select, DatePicker, Card, Statistic, Divider, Popconfirm, message } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined,
  UserOutlined,
  CalendarOutlined,
  SolutionOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FeedbacksAndDisputes = () => {
  const [feedbackData, setFeedbackData] = useState([
    {
      key: 1,
      date: "2025-04-01",
      user: "Farmer John",
      userType: "farmer",
      feedback: "Request process was too slow. Can be improved.",
      status: "pending",
      category: "process",
      priority: "medium",
    },
    {
      key: 2,
      date: "2025-04-03",
      user: "NGO Hunger Relief",
      userType: "ngo",
      feedback: "Received 200kg of rice successfully. Thank you!",
      status: "resolved",
      category: "appreciation",
      priority: "low",
    },
    {
      key: 3,
      date: "2025-04-05",
      user: "Farmer Mary",
      userType: "farmer",
      feedback: "Request was canceled without notice. Very inconvenient.",
      status: "pending",
      category: "complaint",
      priority: "high",
    },
    {
      key: 4,
      date: "2025-04-07",
      user: "NGO Green Earth",
      userType: "ngo",
      feedback: "Some of the produce received was damaged during transport.",
      status: "in-progress",
      category: "quality",
      priority: "high",
    },
    {
      key: 5,
      date: "2025-04-09",
      user: "Farmer David",
      userType: "farmer",
      feedback: "The payment process was very smooth and efficient.",
      status: "resolved",
      category: "appreciation",
      priority: "low",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Status tag colors
  const statusColors = {
    pending: "orange",
    "in-progress": "blue",
    resolved: "green",
    rejected: "red",
  };

  // Priority tag colors
  const priorityColors = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  // User type colors
  const userTypeColors = {
    farmer: "volcano",
    ngo: "geekblue",
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <div className="flex items-center">
          <CalendarOutlined className="mr-1" />
          {text}
        </div>
      ),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text, record) => (
        <div className="flex items-center">
          <UserOutlined className="mr-1" />
          <Tag color={userTypeColors[record.userType]}>{text}</Tag>
        </div>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (text) => (
        <div className="flex items-start">
          <FileTextOutlined className="mr-1 mt-1" />
          <span className="line-clamp-2">{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <Tag>{text}</Tag>,
      filters: [
        { text: "Process", value: "process" },
        { text: "Quality", value: "quality" },
        { text: "Complaint", value: "complaint" },
        { text: "Appreciation", value: "appreciation" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => (
        <Tag color={priorityColors[text]}>
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </Tag>
      ),
      sorter: (a, b) => a.priority.localeCompare(b.priority),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={statusColors[text]}>
          {text === "in-progress" ? "In Progress" : text.charAt(0).toUpperCase() + text.slice(1)}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "In Progress", value: "in-progress" },
        { text: "Resolved", value: "resolved" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            type="primary"
            icon={<SolutionOutlined />}
            onClick={() => handleViewFeedback(record)}
          >
            View
          </Button>
          {record.status !== "resolved" && (
            <Popconfirm
              title="Are you sure you want to resolve this feedback?"
              onConfirm={() => handleResolveFeedback(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="default" icon={<CheckCircleOutlined />}>
                Resolve
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  const handleViewFeedback = (record) => {
    setSelectedFeedback(record);
    setIsModalVisible(true);
  };

  const handleResolveFeedback = (key) => {
    setFeedbackData(
      feedbackData.map((item) =>
        item.key === key ? { ...item, status: "resolved" } : item
      )
    );
    message.success("Feedback marked as resolved");
  };

  const handleRejectFeedback = (key) => {
    setFeedbackData(
      feedbackData.map((item) =>
        item.key === key ? { ...item, status: "rejected" } : item
      )
    );
    message.warning("Feedback rejected");
  };

  const handleModalOk = () => {
    if (replyText.trim()) {
      // In a real app, you would save the reply to your backend
      message.success("Reply sent successfully");
      setReplyText("");
      setIsModalVisible(false);
    } else {
      message.error("Please enter a reply");
    }
  };

  const handleModalCancel = () => {
    setReplyText("");
    setIsModalVisible(false);
  };

  const filteredData = feedbackData.filter((item) => {
    const matchesSearch = item.feedback.toLowerCase().includes(searchText.toLowerCase()) ||
                         item.user.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesUserType = userTypeFilter === "all" || item.userType === userTypeFilter;
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter;
    
    let matchesDate = true;
    if (dateRange && dateRange.length === 2) {
      const feedbackDate = dayjs(item.date);
      matchesDate = feedbackDate.isAfter(dateRange[0]) && feedbackDate.isBefore(dateRange[1]);
    }
    
    return matchesSearch && matchesStatus && matchesUserType && matchesCategory && matchesPriority && matchesDate;
  });

  // Statistics
  const pendingCount = feedbackData.filter(f => f.status === "pending").length;
  const inProgressCount = feedbackData.filter(f => f.status === "in-progress").length;
  const resolvedCount = feedbackData.filter(f => f.status === "resolved").length;
  const rejectedCount = feedbackData.filter(f => f.status === "rejected").length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <ExclamationCircleOutlined className="mr-2" />
            Feedbacks & Disputes Management
          </h2>
          <p className="text-gray-600">Monitor and resolve user feedbacks and disputes</p>
        </div>
       
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Statistic
            title="Total Feedbacks"
            value={feedbackData.length}
            prefix={<FileTextOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Pending"
            value={pendingCount}
            valueStyle={{ color: "#fa8c16" }}
            prefix={<ExclamationCircleOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="In Progress"
            value={inProgressCount}
            valueStyle={{ color: "#1890ff" }}
            prefix={<SolutionOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Resolved"
            value={resolvedCount}
            valueStyle={{ color: "#52c41a" }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </div>

      {/* Filters */}
      <Card title="Filters" className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Search
            placeholder="Search feedbacks..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by Status"
            size="large"
            allowClear
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Option value="all">All Statuses</Option>
            <Option value="pending">Pending</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="resolved">Resolved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Select
            placeholder="Filter by User Type"
            size="large"
            allowClear
            value={userTypeFilter}
            onChange={setUserTypeFilter}
          >
            <Option value="all">All Users</Option>
            <Option value="farmer">Farmers</Option>
            <Option value="ngo">NGOs</Option>
          </Select>
          <Select
            placeholder="Filter by Category"
            size="large"
            allowClear
            value={categoryFilter}
            onChange={setCategoryFilter}
          >
            <Option value="all">All Categories</Option>
            <Option value="process">Process</Option>
            <Option value="quality">Quality</Option>
            <Option value="complaint">Complaint</Option>
            <Option value="appreciation">Appreciation</Option>
          </Select>
          <RangePicker
            size="large"
            style={{ width: "100%" }}
            onChange={setDateRange}
          />
        </div>
      </Card>

      {/* Feedback Table */}
      <Card className="shadow-lg">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          rowClassName={(record) => 
            record.priority === "high" ? "bg-red-50" : 
            record.priority === "medium" ? "bg-orange-50" : ""
          }
        />
      </Card>

      {/* Feedback Detail Modal */}
      <Modal
        title={<span className="text-lg font-semibold">Feedback Details</span>}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
        footer={[
          <Button key="reject" danger onClick={() => {
            handleRejectFeedback(selectedFeedback?.key);
            setIsModalVisible(false);
          }}>
            <CloseCircleOutlined /> Reject
          </Button>,
          <Button key="resolve" type="primary" onClick={handleModalOk}>
            <CheckCircleOutlined /> Resolve
          </Button>,
        ]}
      >
        {selectedFeedback && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Date:</p>
                <p>{selectedFeedback.date}</p>
              </div>
              <div>
                <p className="font-semibold">User:</p>
                <Tag color={userTypeColors[selectedFeedback.userType]}>
                  {selectedFeedback.user}
                </Tag>
              </div>
              <div>
                <p className="font-semibold">Status:</p>
                <Tag color={statusColors[selectedFeedback.status]}>
                  {selectedFeedback.status}
                </Tag>
              </div>
              <div>
                <p className="font-semibold">Priority:</p>
                <Tag color={priorityColors[selectedFeedback.priority]}>
                  {selectedFeedback.priority}
                </Tag>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <p className="font-semibold">Feedback:</p>
              <p className="bg-gray-50 p-3 rounded">{selectedFeedback.feedback}</p>
            </div>
            
            <Divider />
            
            <div>
              <p className="font-semibold">Admin Reply:</p>
              <Input.TextArea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Enter your response to the user..."
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FeedbacksAndDisputes;