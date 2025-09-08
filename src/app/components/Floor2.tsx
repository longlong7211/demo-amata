interface Floor2Props {
    onBack: () => void;
}

export default function Floor2({ onBack }: Floor2Props) {
    return (
        <div>
            <h2>Tầng 2 - Văn Phòng Hành Chính</h2>
            <p>Tầng 2 dành cho các hoạt động hành chính và quản lý.</p>
            <h3>Các phòng ban:</h3>
            <ul>
                <li>👥 Phòng Nhân sự</li>
                <li>💼 Phòng Kinh doanh</li>
                <li>📊 Phòng Kế toán</li>
                <li>🏛️ Phòng Pháp chế</li>
                <li>🤝 Phòng Quan hệ khách hàng</li>
            </ul>
            <button className="back-button" onClick={onBack}>← Quay lại</button>
        </div>
    );
}
