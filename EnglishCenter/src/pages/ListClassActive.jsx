import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Hero from "../components/Hero/Hero";
import ListCardMini from "../components/ListCard/ListCardMini";
import {
  useGetTopViewedQuery,
  useGetRecentBlogQuery,
} from "../services/blogServices";
import {
  useGetAllAddressQuery,
  useGetClassByAddressAndMonthQuery,
} from "../services/addressServices";
import Contact from "../components/Common/Contact";
import PropTypes from "prop-types";

// Fake API data
const mockData = {
  teachers: [
    { id: 1, name: "Cs. Hạ Đông", active: true },
    { id: 2, name: "Cs. Nam Tú Liêm", active: false },
    { id: 3, name: "Cs. Hai Bà Trưng", active: false },
    { id: 4, name: "Cs. Tây Sơn", active: false },
    { id: 5, name: "Cs. Kim Mã", active: false },
    { id: 6, name: "Cs. Bắc Từ Liêm", active: false },
  ],
  classes: [
    {
      id: 1,
      subject: "FOUNDATION TOEIC",
      subtitle: "(Xây dựng nền tảng)",
      classCode: "F144HD",
      date: "3/6",
      room: "T2,4,6",
      time: "18h00 - 19h45",
      status: "active",
    },
    {
      id: 2,
      subject: "FOUNDATION TOEIC",
      subtitle: "(Xây dựng nền tảng)",
      classCode: "F147HD",
      date: "23/6",
      room: "T2,4,6",
      time: "20h10-21h55",
      status: "active",
    },
    {
      id: 3,
      subject: "FOUNDATION TOEIC",
      subtitle: "(Xây dựng nền tảng)",
      classCode: "F146HD",
      date: "17/6",
      room: "T3,5,7",
      time: "18h00 - 19h45",
      status: "active",
    },
    {
      id: 4,
      subject: "FOUNDATION TOEIC",
      subtitle: "(Xây dựng nền tảng)",
      classCode: "F148HD",
      date: "24/6",
      room: "T3,5,7",
      time: "20h10-21h55",
      status: "active",
    },
    {
      id: 5,
      subject: "FOUNDATION TOEIC",
      subtitle: "(Xây dựng nền tảng)",
      classCode: "F145HD",
      date: "16/6",
      room: "T2,4,6",
      time: "18h00 - 19h45",
      status: "active",
    },
  ],
};

const weekDaysMap = {
  2: "Thứ 2",
  3: "Thứ 3",
  4: "Thứ 4",
  5: "Thứ 5",
  6: "Thứ 6",
  7: "Thứ 7",
  8: "Chủ nhật",
};

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Add MapController component to handle map movement
function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}

function ClassSchedule() {
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [hoveredAddress, setHoveredAddress] = useState(null);
  const { data: addressData } = useGetAllAddressQuery({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data: topViewedData, isLoading: isLoadingTopViewed } =
    useGetTopViewedQuery();
  const { data: recentBlogData, isLoading: isLoadingRecentBlog } =
    useGetRecentBlogQuery();
  const { data: classesData, isLoading: isLoadingClasses } =
    useGetClassByAddressAndMonthQuery(
      {
        address_id: selectedAddress?.id,
        year: new Date().getFullYear(),
        month: selectedMonth,
      },
      {
        skip: !selectedAddress?.id,
      }
    );

  const [transformedData, setTransformedData] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (classesData?.data) {
      const transformed = classesData.data.map((item) => {
        const weekDays = item.class_schedules.map(
          (sch) => weekDaysMap[sch.weekday.week_day]
        );
        const startTimes = item.class_schedules.map(
          (sch) => sch.weekday.start_time
        );

        // Format the date
        const formattedDate = new Date(item.start_date).toLocaleDateString(
          "vi-VN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );

        return {
          ...item,
          week_days: [...new Set(weekDays)].join(", "),
          start_times: [...new Set(startTimes)].join(", "),
          formatted_date: formattedDate,
        };
      });
      setTransformedData(transformed);
    } else {
      setTransformedData([]);
    }
  }, [classesData]);

  // Set initial selected address when addressData is loaded
  useEffect(() => {
    if (addressData?.data && addressData.data.length > 0) {
      setSelectedAddress(addressData.data[0]);
    }
  }, [addressData]);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTeachers(mockData.teachers);
      setClasses(mockData.classes);
    };

    fetchData();
  }, []);

  const handleTeacherChange = (event, newValue) => {
    setSelectedTeacher(newValue);
    if (addressData?.data[newValue]) {
      const selectedAddr = addressData.data[newValue];
      setSelectedAddress(selectedAddr);
    }
  };

  const handleMarkerClick = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${address.latitude},${address.longitude}`;
    window.open(url, "_blank");
  };

  const handleMarkerMouseOver = (address) => {
    setHoveredAddress(address);
  };

  const handleMarkerMouseOut = () => {
    setHoveredAddress(null);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const breadcrumbPaths = [
    { name: "Trang chủ", url: "/" },
    { name: "Lịch khai giảng", url: "/lich-khai-giang" },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = (classItem) => {
    setSelectedClass(classItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null);
  };

  return (
    <>
      <Hero title="Lịch khai giảng" breadcrumbPaths={breadcrumbPaths} />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", p: 3 }}>
        {/* Left side content */}
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>
          Lịch khai giảng
        </Typography>

        {/* Teacher Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={selectedTeacher}
            onChange={handleTeacherChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                minWidth: 120,
                textTransform: "none",
                fontSize: "14px",
                bgcolor: "#e0e0e0",
                color: "#666",
                border: "1px solid #ddd",
                borderRadius: "8px",
                mr: 1,
                mb: 1,
              },
              "& .Mui-selected": {
                bgcolor: "#ff9800",
                color: "white !important",
                fontWeight: "bold",
              },
            }}>
            {addressData?.data.map((address, index) => (
              <Tab
                key={address.id}
                label={`Cs.${address.district} - ${address.province}`}
                sx={{
                  bgcolor: index === selectedTeacher ? "#ff9800" : "#e0e0e0",
                  color: index === selectedTeacher ? "white" : "#666",
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Map Component */}
        <Box
          sx={{
            mb: 4,
            height: "500px",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e0e0e0",
            position: "relative",
          }}>
          {hoveredAddress && (
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                bgcolor: "white",
                borderRadius: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                p: "4px 12px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}>
              <Chip
                label={`Cs.${hoveredAddress.district} - ${hoveredAddress.province}`}
                sx={{
                  bgcolor: "#ff9800",
                  color: "white",
                  fontWeight: "bold",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "#666" }}>
                {hoveredAddress.street}, {hoveredAddress.ward}
              </Typography>
            </Box>
          )}
          <MapContainer
            center={
              selectedAddress
                ? [selectedAddress.latitude, selectedAddress.longitude]
                : [21.0285, 105.8542]
            }
            zoom={13}
            style={{ height: "100%", width: "100%" }}>
            <MapController
              center={
                selectedAddress
                  ? [selectedAddress.latitude, selectedAddress.longitude]
                  : null
              }
            />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {addressData?.data.map((address) => (
              <Marker
                key={address.id}
                position={[address.latitude, address.longitude]}
                eventHandlers={{
                  click: () => handleMarkerClick(address),
                  mouseover: () => handleMarkerMouseOver(address),
                  mouseout: handleMarkerMouseOut,
                }}>
                <Tooltip
                  permanent={false}
                  direction="top"
                  offset={[0, -10]}
                  opacity={0}>
                  <span>{`Cs.${address.district}`}</span>
                </Tooltip>
                <Popup>
                  <Box sx={{ p: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}>
                      {`Cs.${address.district} - ${address.province}`}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {address.street}, {address.ward}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      fullWidth
                      onClick={() => handleMarkerClick(address)}
                      sx={{
                        bgcolor: "#ff9800",
                        "&:hover": {
                          bgcolor: "#f57c00",
                        },
                      }}>
                      Xem trên Google Maps
                    </Button>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}>
          <Box
            sx={{
              flex: "0 0 70%",
            }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
                Chọn tháng:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {months.map((month) => (
                  <Chip
                    key={month}
                    label={month}
                    clickable
                    onClick={() => setSelectedMonth(month)}
                    sx={{
                      bgcolor: month === selectedMonth ? "#ff9800" : "#e0e0e0",
                      color: month === selectedMonth ? "white" : "#666",
                      fontWeight: month === selectedMonth ? "bold" : "normal",
                      "&:hover": {
                        bgcolor:
                          month === selectedMonth ? "#f57c00" : "#d0d0d0",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Classes Table */}
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: "rgb(37, 99, 235)" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      KHÓA HỌC
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      LỚP
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      NGÀY
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      LỊCH HỌC
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      THỜI GIAN
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      NHẬN TƯ VẤN
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingClasses ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Đang tải dữ liệu...
                      </TableCell>
                    </TableRow>
                  ) : transformedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        Không có dữ liệu lớp học
                      </TableCell>
                    </TableRow>
                  ) : (
                    transformedData.map((classItem, index) => (
                      <TableRow
                        key={classItem.id}
                        sx={{
                          "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" },
                          "&:hover": { bgcolor: "#f0f0f0" },
                        }}>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", color: "#333" }}>
                              {classItem.course.menu.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold", color: "#333" }}>
                              {classItem.name}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* <TableCell>
                          <Typography variant="body1">
                            {classItem.class_schedules.map()}
                          </Typography>
                        </TableCell> */}
                        <TableCell>
                          <Typography variant="body1">
                            {classItem.week_days}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {classItem.start_times}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {classItem.formatted_date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleOpen(classItem)}
                            variant="outlined"
                            sx={{
                              color: "#3f51b5",
                              borderColor: "#3f51b5",
                              textTransform: "none",
                              fontSize: "14px",
                              "&:hover": {
                                bgcolor: "#3f51b5",
                                color: "white",
                              },
                            }}>
                            Nhận tư vấn
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/* Month Selection */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              position: "sticky",
              top: "20px",
              flex: "0 0 25%",
            }}>
            <ListCardMini
              posts={topViewedData?.data || []}
              title="Nhiều người quan tâm"
            />
            <ListCardMini
              posts={recentBlogData?.data || []}
              title="Bài viết gần đây"
            />
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
          },
        }}>
        <DialogContent sx={{ p: 0 }}>
          <Contact classInfo={selectedClass} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

MapController.propTypes = {
  center: PropTypes.any,
};
export default ClassSchedule;
