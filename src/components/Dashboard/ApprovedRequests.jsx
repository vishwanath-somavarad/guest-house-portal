import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPROVED_RQUEST_CONSTANT } from "../constants/commonString";
import CustomTable from "../ghcomponents/CustomTable";
import NoDataFound from "../ghcomponents/NoDataFound";
import appConfig from "../services/appConfig";
import { userMyRequest } from "./dashboard.action";

const ApprovedRequests = () => {
  const dispatch = useDispatch();
  const myRoomReq = useSelector((state) => state.userRoomRequestReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    let result = myRoomReq?.myReqResult?.filter(
      (item) => item.status === "approved" || item.status === "extended"
    );
    result = result?.map((item, index) => ({
      slNo: index + 1,
      project: item.client,
      approved: item.approved_by,
      purpose_of_visit: item.purpose,
      ...item,
    }));
    setData(result);
  }, [myRoomReq.myReqResult]);

  useEffect(() => {
    async function fetchMyRequests() {
      const { response, error } = await userMyRequest(
        appConfig.API_BASE_URL,
        dispatch
      );
    }
    fetchMyRequests();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!data.length) {
    return <NoDataFound />;
  }

  return (
    <Container component={"div"} maxWidth={false} sx={{ my: 6 }}>
      <CustomTable
        columns={APPROVED_RQUEST_CONSTANT}
        rows={data}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default ApprovedRequests;
