import requester from "../utils/requester";

export const getCustomers = async() => {
  try {
    return (await requester.get('/customers'))?.data;
  } catch (error) {
    console.log(error);
}};

export const addCustomer = async(customer: any) => {
  try {
    return (await requester.post('/customers', customer))?.data;
  } catch (error) {
    console.log(error);
}}