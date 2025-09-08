interface Floor3Props {
    onBack: () => void;
}

export default function Floor3({ onBack }: Floor3Props) {
    return (
        <div>
            <h2>Tầng 3 - Kỹ Thuật & Thiết Kế</h2>
            <p>Tầng 3 là nơi làm việc của đội ngũ kỹ thuật và thiết kế.</p>
            <h3>Các bộ phận:</h3>
            <ul>
                <li>🏗️ Phòng Thiết kế kiến trúc</li>
                <li>⚙️ Phòng Kỹ thuật xây dựng</li>
                <li>🔧 Phòng Kỹ thuật cơ điện</li>
                <li>🌿 Phòng Thiết kế cảnh quan</li>
                <li>📐 Phòng Quy hoạch tổng thể</li>
            </ul>
            <button className="back-button" onClick={onBack}>← Quay lại</button>
        </div>
    );
}
