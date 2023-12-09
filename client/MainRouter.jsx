import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from './auth/Signin';
import Menu from './core/Menu';
import FeaturedItems from "./products/FeaturedItems";
import EditItems from "./products/EditItems";
import CreateItems from "./products/CreateItems";
import RemoveItems from "./products/RemoveItem";
import UpdateUser from './user/UpdateUser.jsx';

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
      <Route exact path="/" element={<Home/>}/>
        <Route path="/user" element={<UpdateUser/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/featureditems" element={<FeaturedItems/>}/>
        <Route path="/edititems" element={<EditItems/>}/>
        <Route path="/createitems" element={<CreateItems/>}/>
        <Route path="/removeitems" element={<RemoveItems/>}/>
      </Routes>
    </div>
  );
};
export default MainRouter;
