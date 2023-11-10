import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState([]);

  const getAllItems = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get("/api/items/get-item");
      setItemsData(data);
      dispatch({ type: "HIDE_LOADING" });
      console.log(data);
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllItems();
    //eslint-disable-next-line
  }, []);

  //handle deleet
  const handleDelete = async (deleteRecord) => {
    console.log("deleted item is", deleteRecord);
    try {
      dispatch({
        type: "SHOW_LOADING",
      });

      await axios.post("/api/items/delete-item", { itemId: deleteRecord._id });
      message.success("Item Deleted Succesfully");
      setIsModalVisible(false);
      getAllItems();
      setPopupModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  //able data
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <div className="editIcon">
            <EditOutlined
              style={{ cursor: "pointer", fontSize: "20px", color: "blue" }}
              onClick={() => {
                setEditItem(record);
                setPopupModal(true);
              }}
            />
          </div>
          <div className="deleteIcon">
            <DeleteOutlined
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                fontSize: "20px",
                color:"red"
              }}
              onClick={() => {
                setIsModalVisible(true);
                setDeleteRecord(record);
                // console.log("record is", record)
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  // handle form  submit
  const handleSubmit = async (value) => {
    console.log("form values are" , value);
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/add-item", value);
        message.success("Item Added Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List </h1>
        <Button type="primary" name="Add Item" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={itemsData}
        bordered
        className="custom-table"
      />

      {popupModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item " : "Add New Item"}`}
          open={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
            encType="multipart/form-data"
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>                    
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="Drinks">Drinks</Select.Option>
                <Select.Option value="Rice">Rice</Select.Option>
                <Select.Option value="Noodles">Noodels</Select.Option>
                <Select.Option value="Soup">Soup</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
      {isModalVisible && (
        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => handleDelete(deleteRecord)}
        >
          <p style={{ fontSize: "20px" }}>Do you want to delete this item?</p>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
