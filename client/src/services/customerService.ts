import { Customer } from "../interfaces/customer";
import requester from "../utils/requester";

export const getCustomers = async() => {
  try {
    return (await requester.get('/customers'))?.data;
  } catch (error) {
    console.log(error);
}};

export const addCustomer = async(customer: Customer) => {
  try {
    return (await requester.post('/customers', customer))?.data;
  } catch (error) {
    console.log(error);
}}

export const editCustomer = async(id: number, customer: Customer) => {
  try {
    return (await requester.put(`/customers/${id}`, customer))?.data;
  } catch (error) {
    console.log(error);
}}

export const deleteCustomer = async(id: number) => {
  try {
    return (await requester.delete(`/customers/${id}`))?.data;
  } catch (error) {
    console.log(error);
}}