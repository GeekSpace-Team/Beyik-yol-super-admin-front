import Loading from "../../common/Loading";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";
import { AxiosInstance } from "../../api/AxiosInstance";
import { UserI } from "../../common/model";
import { ImageType, getImageUrl } from "../../common/utils";

const Profile = () => {
    const [data,setData] = useState<UserI | undefined>();
    function getProfile(){
        AxiosInstance.get<UserI>('/mobile-auth/get-profile')
        .then(profile =>{
            setData(profile.data);
        })
        .catch(err =>{})
    }
    useEffect(()=>{
        getProfile();
    },[])
    return (
        data?
        <div className="homeCard">
            <Stack pt={5} direction="row" justifyContent="center">
                <label style={{fontSize: "24px", fontWeight: "600"}}>Hoş geldiňiz!</label>
            </Stack>
            <Stack pt={5} direction="row" justifyContent="center">
                <img src={getImageUrl(data?.image,ImageType.User)} alt=""/>
            </Stack>
            <Stack
                direction="column"
                mt={3}
                justifyContent="center"
                ml={"35%"}
                width="35%"
            >
                <Stack
                    direction="row"
                    spacing={3}
                    p={1.5}
                    pl={2}
                    style={{
                        background: "#D5E4ED",
                        border: "1px solid ##D5E4ED",
                        boxShadow:
                            "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
                        borderRadius: "32px",
                    }}
                >
                    <label>Doly ady :</label>
                    <label style={{fontWeight: "600"}}>{data.fullname}</label>
                </Stack>
                <Stack
                    direction="row"
                    spacing={3}
                    mt={3}
                    p={1.5}
                    pl={2}
                    style={{
                        background: "#D5E4ED",
                        border: "1px solid ##D5E4ED",
                        boxShadow:
                            "2px 2px 6px rgba(116,150, 204, 0.5), -2px -2px 6px rgba(255,255,255,0.4)",
                        borderRadius: "32px",
                    }}
                >
                    <label>Telefon belgisi :</label>
                    <label style={{fontWeight: "600"}}>{data.phonenumber}</label>
                </Stack>
            </Stack>
        </div>
        :
        <Loading open={!data}/>
    );
};

export default Profile;
