export const createSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD") // Chuyển đổi các ký tự có dấu thành không dấu
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
    .replace(/[đĐ]/g, "d") // Chuyển đổi đ/Đ thành d
    .replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ lại chữ cái, số, khoảng trắng và dấu gạch ngang
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-") // Loại bỏ các dấu gạch ngang liên tiếp
    .trim(); // Loại bỏ khoảng trắng ở đầu và cuối
};
