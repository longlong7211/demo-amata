interface Floor5Props {
    onBack: () => void;
}

export default function Floor5({ onBack }: Floor5Props) {
    return (
        <div>
            <h2>Tầng 5 - Trung Tâm Đào Tạo</h2>
            <p>Tầng 5 là trung tâm đào tạo và phát triển nguồn nhân lực.</p>
            <h3>Các khu vực:</h3>
            <ul>
                <li>🎓 Phòng đào tạo lớn</li>
                <li>💻 Phòng máy tính</li>
                <li>📚 Thư viện tài liệu</li>
                <li>🎯 Phòng thực hành</li>
                <li>☕ Khu nghỉ ngơi</li>
            </ul>
            <button className="back-button" onClick={onBack}>← Quay lại</button>
        </div>
    );
}
