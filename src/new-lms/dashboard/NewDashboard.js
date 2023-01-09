import React, { useState } from "react";
import "./UserPanel.css";
import { useSelector } from "react-redux";
import Navbar from '../navbar/Navbar'
import DashBoardMenu from "./DashBoardMenu";
import { Box } from "@mui/material";

export default function NewUserDashboard({
    currentTab,
    firstChildSelected,
    secondChildSelected,
    thirdChildSelected,
    fourthChildSelected,
    children,
    videoController
}) {
    const { globalUser } = useSelector((state) => state.userReducer);
    return (
        <section className="new-dashboard">
            <Navbar submenu={
                <DashBoardMenu
                    currentTab={currentTab}
                    firstChildSelected={firstChildSelected}
                    secondChildSelected={secondChildSelected}
                    thirdChildSelected={thirdChildSelected}
                    fourthChildSelected={fourthChildSelected}
                    globalUser={globalUser}
                />
            } />
            <div className="container-fluid" style={{ paddingTop: '100px' }}>
                <div className="row">
                    <div className="col-lg-2">
                        <div className="no-mobile no-tablet" style={{ position: 'sticky', top: '100px' }}>
                            <DashBoardMenu
                                currentTab={currentTab}
                                firstChildSelected={firstChildSelected}
                                secondChildSelected={secondChildSelected}
                                thirdChildSelected={thirdChildSelected}
                                fourthChildSelected={fourthChildSelected}
                                globalUser={globalUser}
                            />
                            {videoController}
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <Box sx={{ marginTop: { xs: '20px', md: '40px' }, padding:'0px 0px 10% 0px' }}>
                            {children}
                        </Box>
                    </div>

                </div>
            </div>
        </section>
    );

}