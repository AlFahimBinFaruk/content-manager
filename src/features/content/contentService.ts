import axios from "axios";

//api route that i want to hit
const API_URL = `${process.env.REACT_APP_BASE_URL}/api/manage/`;

//create new content
const createContent = async (contentData: object, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  //post date
  const response = await axios.post(API_URL, contentData, config);
  //retrun response
  return response.data;
};

//getSingleContentData
const getSingleContentData = async (id: string, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  //get single data
  const response = await axios.get(API_URL + id, config);
  //return response
  return response.data;
};

//getMyContentList
const getMyContentList = async (token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  //get all data
  const response = await axios.get(API_URL, config);
  //return response
  return response.data;
};

//updateContent
const updateContent = async (
  id: string,
  NewContentData: object,
  token: string
) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  //update news
  const response = await axios.put(API_URL + id, NewContentData, config);
  //return response
  return response.data;
};

//delete the content
const deleteContent = async (id: string, token: string) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  //delete news
  const response = await axios.delete(API_URL + id, config);
  //return response
  return response.data;
};

//export manage newsservice
const manageNewsService = {
  createContent,
  getSingleContentData,
  getMyContentList,
  updateContent,
  deleteContent,
};

export default manageNewsService;
