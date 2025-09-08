interface Floor4Props {
    onBack: () => void;
}

export default function Floor4({ onBack }: Floor4Props) {
    return (
        <div>
            <h2>Tầng 4 - Ban Điều Hành</h2>
            <p>Tầng 4 là nơi làm việc của ban lãnh đạo và điều hành.</p>
            <h3>Các phòng:</h3>
            <ul>
                <li>🏢 Phòng Tổng Giám đốc</li>
                <li>👔 Phòng Phó Tổng Giám đốc</li>
                <li>📋 Phòng Hội đồng quản trị</li>
                <li>🤝 Phòng Họp lớn</li>
                <li>☕ Khu tiếp khách VIP</li>
            </ul>
            <button className="back-button" onClick={onBack}>← Quay lại</button>
        </div>
    );
}
