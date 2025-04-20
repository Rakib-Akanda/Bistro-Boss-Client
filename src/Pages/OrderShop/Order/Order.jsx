import { Helmet } from "react-helmet-async";
import orderImg from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
const Order = () => {
  const categories = ["Salads", "Pizza", "Soups", "Desserts", "Drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  // console.log(category);
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title> Bistro | Order Food</title>
      </Helmet>
      <div>
        {/* Our Shop Banner */}
        <div>
          <Cover
            image={orderImg}
            title={"Order food"}
            details={"Would you like to try a dish?"}
          ></Cover>
        </div>
        {/* Our Shop Main*/}
        <div className="max-w-screen-xl mx-auto  my-16">
          {/* Normal Tabs */}
          {/* <div role="tablist" className="tabs tabs-border">
            <a role="tab" className="tab">
              Tab 1
            </a>
            <a role="tab" className="tab tab-active">
              Tab 2
            </a>
            <a role="tab" className="tab">
              Tab 3
            </a>
          </div> */}
          {/* React Tabs */}
          <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>SALAD</Tab>
              <Tab>PIZZA</Tab>
              <Tab>SOUPS</Tab>
              <Tab>DESSERTS</Tab>
              <Tab>DRINKS</Tab>
            </TabList>
            <TabPanel>
              <OrderTab items={salad}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={pizza}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={soup}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={desserts}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={drinks}></OrderTab>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Order;
