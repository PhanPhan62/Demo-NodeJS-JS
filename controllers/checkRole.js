// Middleware kiểm tra quyền dựa trên "LoaiQuyen" của người dùng
const checkPermission = function checkPermission(permission) {
    return function(req, res, next) {
        const userLoaiQuyen = req.LoaiQuyen; // Điều này giả định rằng bạn có thông tin người dùng sau khi họ đăng nhập

        // Kiểm tra xem người dùng có quyền hạn để thực hiện chức năng hay không
        if (userLoaiQuyen === permission) {
            // Nếu có quyền, tiếp tục xử lý
            next();
        } else {
            // Nếu không có quyền, trả về lỗi hoặc chuyển hướng đến trang khác
            res.status(403).json({ message: 'Access denied. Permission required.' });
        }
    };
}

module.exports = {
    checkPermission,
}