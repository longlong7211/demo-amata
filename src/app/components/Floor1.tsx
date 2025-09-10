import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface Floor1Props {
    onBack: () => void;
}

interface HotspotArea {
    id: string;
    x: number; // Vị trí X (%)
    y: number; // Vị trí Y (%)
    width: number; // Chiều rộng (%)
    height: number; // Chiều cao (%)
    title: string;
    description: string;
    details: string[];
    icon: string;
    demoImage: string; // Đường dẫn ảnh demo
    fullDescription: string; // Mô tả chi tiết đầy đủ
}

export default function Floor1({ onBack }: Floor1Props) {
    const [hoveredArea, setHoveredArea] = useState<HotspotArea | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [imagePosition, setImagePosition] = useState({ offsetX: 0, offsetY: 0, scaledWidth: 0, scaledHeight: 0 });
    const [isHoveringPopup, setIsHoveringPopup] = useState(false);
    const [hideTimeoutId, setHideTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isHoveringHotspot, setIsHoveringHotspot] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Định nghĩa các khu vực có thể hover (tọa độ theo %)
    const hotspotAreas: HotspotArea[] = [
        {
            id: 'lobby',
            x: 15, y: 50, width: 11.6, height: 18,
            title: 'Nhà Hàng Nhật Bản Thiên Quế',
            description: 'Nhà Hàng Nhật Bản Thiên Quế',
            details: [
                '• Thực đơn đa dạng với hơn 150 món ăn truyền thống Nhật Bản',
                '• Nguyên liệu tươi sống được nhập khẩu trực tiếp từ Nhật Bản',
                '• Đầu bếp chuyên nghiệp có kinh nghiệm 15+ năm',
                '• Không gian trang nhã với thiết kế truyền thống',
                '• Phòng riêng cho gia đình và doanh nghiệp',
                '• Dịch vụ đặt bàn trước 24/7',
                '• Chương trình khuyến mại hấp dẫn cuối tuần',
                '• WiFi miễn phí tốc độ cao',
                '• Khu vực đậu xe riêng cho khách hàng',
                '• Phục vụ từ 10:00 - 22:00 hàng ngày'
            ],
            icon: '',
            demoImage: 'https://csdl.vietnamtourism.gov.vn/uploads/images/01_3/CSDLNHAHANG2020/DONGNAI/ThienQue333/NhahangThienque3.jpg',
            fullDescription: 'Nhà hàng Nhật Bản Thiên Quế là điểm đến lý tưởng cho những ai yêu thích ẩm thực Nhật Bản tinh tế. Với không gian trang nhã, phong cách tối giản đặc trưng của văn hóa Nhật Bản, nhà hàng mang đến trải nghiệm ẩm thực đầy tinh tế và sang trọng. Được thành lập từ năm 2010, chúng tôi tự hào là một trong những nhà hàng Nhật Bản uy tín nhất tại khu vực với đội ngũ đầu bếp chuyên nghiệp và nguyên liệu cao cấp được nhập khẩu trực tiếp từ Nhật Bản.'
        }
    ];

    // Tính toán vị trí và kích thước ảnh thực tế trong container
    const calculateImagePosition = () => {
        if (!containerRef.current || !imageLoaded) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Tính tỷ lệ khung hình
        const imageAspectRatio = imageDimensions.width / imageDimensions.height;
        const containerAspectRatio = containerWidth / containerHeight;

        let scaledWidth, scaledHeight, offsetX, offsetY;

        if (imageAspectRatio > containerAspectRatio) {
            // Ảnh bị giới hạn bởi chiều rộng container
            scaledWidth = containerWidth;
            scaledHeight = containerWidth / imageAspectRatio;
            offsetX = 0;
            offsetY = (containerHeight - scaledHeight) / 2;
        } else {
            // Ảnh bị giới hạn bởi chiều cao container
            scaledHeight = containerHeight;
            scaledWidth = containerHeight * imageAspectRatio;
            offsetX = (containerWidth - scaledWidth) / 2;
            offsetY = 0;
        }

        setImagePosition({ offsetX, offsetY, scaledWidth, scaledHeight });
    };

    // Chạy lại tính toán khi ảnh load hoặc window resize
    useEffect(() => {
        calculateImagePosition();

        const handleResize = () => calculateImagePosition();
        window.addEventListener('resize', handleResize);

        // Cleanup timeout khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId);
            }
        };
    }, [imageLoaded, imageDimensions, hideTimeoutId, isHoveringHotspot]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || !imageLoaded) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Chuyển đổi tọa độ chuột thành tọa độ trên ảnh thực tế (%)
        const relativeX = ((mouseX - imagePosition.offsetX) / imagePosition.scaledWidth) * 100;
        const relativeY = ((mouseY - imagePosition.offsetY) / imagePosition.scaledHeight) * 100;

        // Kiểm tra nếu chuột nằm trong vùng ảnh
        if (relativeX < 0 || relativeX > 100 || relativeY < 0 || relativeY > 100) {
            if (!isHoveringPopup) {
                setIsHoveringHotspot(false);
                // Chỉ ẩn popup khi không hover cả hotspot và popup
                const timeoutId = setTimeout(() => {
                    if (!isHoveringPopup && !isHoveringHotspot) {
                        setHoveredArea(null);
                    }
                }, 100);
                setHideTimeoutId(timeoutId);
            }
            return;
        }

        // Tìm khu vực được hover với buffer zone để tránh flickering
        const buffer = 2; // Buffer 2% để tạo vùng an toàn
        const hoveredSpot = hotspotAreas.find(area =>
            relativeX >= area.x - buffer && relativeX <= area.x + area.width + buffer &&
            relativeY >= area.y - buffer && relativeY <= area.y + area.height + buffer
        );

        if (hoveredSpot) {
            setIsHoveringHotspot(true);
            // Clear timeout ngay khi hover vào hotspot hoặc buffer zone
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId);
                setHideTimeoutId(null);
            }
            setHoveredArea(hoveredSpot);
        } else {
            setIsHoveringHotspot(false);
            // Chỉ ẩn popup khi không hover cả hotspot và popup
            if (!isHoveringPopup) {
                const timeoutId = setTimeout(() => {
                    if (!isHoveringPopup && !isHoveringHotspot) {
                        setHoveredArea(null);
                    }
                }, 100);
                setHideTimeoutId(timeoutId);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHoveringHotspot(false);
        // Chỉ ẩn popup khi không hover cả hotspot và popup
        if (!isHoveringPopup) {
            const timeoutId = setTimeout(() => {
                if (!isHoveringPopup && !isHoveringHotspot) {
                    setHoveredArea(null);
                }
            }, 100); // Giảm delay xuống 100ms vì đã có logic tốt hơn
            setHideTimeoutId(timeoutId);
        }
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
        }}>
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '90vw',
                    height: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src="/floor-img/f1.png"
                    alt="Sơ đồ tầng 1"
                    fill
                    style={{
                        objectFit: 'contain',
                        objectPosition: 'center'
                    }}
                    priority
                    onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        setImageDimensions({
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        });
                        setImageLoaded(true);
                    }}
                />

                {/* Overlay các khu vực hotspot - chỉ hiển thị khi ảnh đã load */}
                {imageLoaded && imagePosition.scaledWidth > 0 && hotspotAreas.map((area) => (
                    <div
                        key={area.id}
                        style={{
                            position: 'absolute',
                            left: `${imagePosition.offsetX + (area.x / 100) * imagePosition.scaledWidth}px`,
                            top: `${imagePosition.offsetY + (area.y / 100) * imagePosition.scaledHeight}px`,
                            width: `${(area.width / 100) * imagePosition.scaledWidth}px`,
                            height: `${(area.height / 100) * imagePosition.scaledHeight}px`,
                            backgroundColor: hoveredArea?.id === area.id
                                ? 'rgba(0, 123, 255, 0.3)'
                                : 'rgba(0, 123, 255, 0.1)',
                            border: hoveredArea?.id === area.id
                                ? '2px solid #007bff'
                                : '1px solid rgba(0, 123, 255, 0.3)',
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: Math.min(
                                (area.width / 100) * imagePosition.scaledWidth / 3,
                                (area.height / 100) * imagePosition.scaledHeight / 2,
                                24
                            ),
                            transform: hoveredArea?.id === area.id ? 'scale(1.05)' : 'scale(1)',
                            zIndex: hoveredArea?.id === area.id ? 3 : 2,
                            pointerEvents: 'none'
                        }}
                    >
                        {area.icon}
                    </div>
                ))}
            </div>

            {/* Popup chi tiết với hình ảnh demo - vị trí cố định theo hotspot area */}
            {hoveredArea && (
                (() => {
                    // Tính toán vị trí popup dựa trên tọa độ của hotspot area
                    const popupWidth = 400;
                    const popupHeight = 500;
                    const arrowSize = 12;
                    const offset = 20;

                    // Tính toán vị trí trung tâm của hotspot area
                    const hotspotCenterX = imagePosition.offsetX +
                        ((hoveredArea.x + hoveredArea.width / 2) / 100) * imagePosition.scaledWidth;
                    const hotspotCenterY = imagePosition.offsetY +
                        ((hoveredArea.y + hoveredArea.height / 2) / 100) * imagePosition.scaledHeight;

                    // Tính toán vị trí cạnh phải của hotspot area
                    const hotspotRightX = imagePosition.offsetX +
                        ((hoveredArea.x + hoveredArea.width) / 100) * imagePosition.scaledWidth;

                    // Tính toán vị trí cạnh trái của hotspot area
                    const hotspotLeftX = imagePosition.offsetX +
                        (hoveredArea.x / 100) * imagePosition.scaledWidth;

                    // Tính toán vị trí cạnh dưới của hotspot area
                    const hotspotBottomY = imagePosition.offsetY +
                        ((hoveredArea.y + hoveredArea.height) / 100) * imagePosition.scaledHeight;

                    // Tính toán vị trí cạnh trên của hotspot area
                    const hotspotTopY = imagePosition.offsetY +
                        (hoveredArea.y / 100) * imagePosition.scaledHeight;

                    let popupX = hotspotCenterX;
                    let popupY = hotspotCenterY;
                    let arrowPosition = 'left';
                    let arrowTop = '50%';
                    let arrowLeft = 'auto';
                    let arrowRight = 'auto';

                    // Xác định vị trí tốt nhất cho popup dựa trên hotspot area
                    const spaceRight = window.innerWidth - hotspotRightX;
                    const spaceLeft = hotspotLeftX;
                    const spaceBottom = window.innerHeight - hotspotBottomY;
                    const spaceTop = hotspotTopY;

                    // Ưu tiên hiển thị bên phải hotspot area
                    if (spaceRight >= popupWidth + offset + arrowSize) {
                        popupX = hotspotRightX + offset + arrowSize;
                        popupY = hotspotCenterY - popupHeight / 2;
                        arrowPosition = 'left';
                        arrowLeft = `-${arrowSize}px`;
                        arrowTop = `${popupHeight / 2}px`;
                    }
                    // Nếu không đủ chỗ bên phải, hiển thị bên trái
                    else if (spaceLeft >= popupWidth + offset + arrowSize) {
                        popupX = hotspotLeftX - popupWidth - offset - arrowSize;
                        popupY = hotspotCenterY - popupHeight / 2;
                        arrowPosition = 'right';
                        arrowRight = `-${arrowSize}px`;
                        arrowTop = `${popupHeight / 2}px`;
                    }
                    // Nếu không đủ chỗ hai bên, hiển thị phía dưới
                    else if (spaceBottom >= popupHeight + offset + arrowSize) {
                        popupX = hotspotCenterX - popupWidth / 2;
                        popupY = hotspotBottomY + offset + arrowSize;
                        arrowPosition = 'top';
                        arrowTop = `-${arrowSize}px`;
                        arrowLeft = `${popupWidth / 2}px`;
                    }
                    // Cuối cùng hiển thị phía trên
                    else {
                        popupX = hotspotCenterX - popupWidth / 2;
                        popupY = hotspotTopY - popupHeight - offset - arrowSize;
                        arrowPosition = 'bottom';
                        arrowTop = `${popupHeight}px`;
                        arrowLeft = `${popupWidth / 2}px`;
                    }

                    // Đảm bảo popup không tràn màn hình
                    popupX = Math.max(20, Math.min(window.innerWidth - popupWidth - 20, popupX));
                    popupY = Math.max(20, Math.min(window.innerHeight - popupHeight - 20, popupY));

                    // Điều chỉnh vị trí mũi tên khi popup bị đẩy để tránh tràn màn hình
                    if (arrowPosition === 'top' || arrowPosition === 'bottom') {
                        const adjustedArrowLeft = hotspotCenterX - popupX;
                        arrowLeft = `${Math.max(20, Math.min(popupWidth - 20, adjustedArrowLeft))}px`;
                    } else if (arrowPosition === 'left' || arrowPosition === 'right') {
                        const adjustedArrowTop = hotspotCenterY - popupY;
                        arrowTop = `${Math.max(30, Math.min(popupHeight - 30, adjustedArrowTop))}px`;
                    }

                    return (
                        <div
                            style={{
                                position: 'fixed',
                                left: `${popupX}px`,
                                top: `${popupY}px`,
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                                zIndex: 1000,
                                width: `${popupWidth}px`,
                                maxHeight: `${Math.min(popupHeight, window.innerHeight - 40)}px`,
                                overflow: 'hidden',
                                border: '1px solid #e0e0e0',
                                animation: 'popupSlideIn 0.3s ease-out'
                            }}
                            onMouseEnter={() => {
                                setIsHoveringPopup(true);
                                // Clear timeout khi hover vào popup
                                if (hideTimeoutId) {
                                    clearTimeout(hideTimeoutId);
                                    setHideTimeoutId(null);
                                }
                            }}
                            onMouseLeave={() => {
                                setIsHoveringPopup(false);
                                // Chỉ ẩn popup khi không hover cả hotspot và popup
                                const timeoutId = setTimeout(() => {
                                    if (!isHoveringPopup && !isHoveringHotspot) {
                                        setHoveredArea(null);
                                    }
                                }, 100);
                                setHideTimeoutId(timeoutId);
                            }}
                        >
                            {/* Mũi tên */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: arrowPosition === 'left' || arrowPosition === 'right' ? arrowTop : arrowTop,
                                    left: arrowLeft,
                                    right: arrowRight,
                                    width: 0,
                                    height: 0,
                                    borderStyle: 'solid',
                                    borderWidth: arrowPosition === 'left' ? `${arrowSize}px ${arrowSize}px ${arrowSize}px 0` :
                                        arrowPosition === 'right' ? `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px` :
                                            arrowPosition === 'top' ? `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px` :
                                                `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
                                    borderColor: arrowPosition === 'left' ? 'transparent white transparent transparent' :
                                        arrowPosition === 'right' ? 'transparent transparent transparent white' :
                                            arrowPosition === 'top' ? 'transparent transparent white transparent' :
                                                'white transparent transparent transparent',
                                    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))',
                                    zIndex: 1001
                                }}
                            />

                            {/* Mũi tên border (tạo viền) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: arrowPosition === 'left' || arrowPosition === 'right' ? arrowTop : arrowTop,
                                    left: arrowPosition === 'left' ? '-13px' :
                                        arrowPosition === 'right' ? `${popupWidth}px` : arrowLeft,
                                    right: arrowRight,
                                    width: 0,
                                    height: 0,
                                    borderStyle: 'solid',
                                    borderWidth: arrowPosition === 'left' ? `${arrowSize + 1}px ${arrowSize + 1}px ${arrowSize + 1}px 0` :
                                        arrowPosition === 'right' ? `${arrowSize + 1}px 0 ${arrowSize + 1}px ${arrowSize + 1}px` :
                                            arrowPosition === 'top' ? `0 ${arrowSize + 1}px ${arrowSize + 1}px ${arrowSize + 1}px` :
                                                `${arrowSize + 1}px ${arrowSize + 1}px 0 ${arrowSize + 1}px`,
                                    borderColor: arrowPosition === 'left' ? 'transparent #e0e0e0 transparent transparent' :
                                        arrowPosition === 'right' ? 'transparent transparent transparent #e0e0e0' :
                                            arrowPosition === 'top' ? 'transparent transparent #e0e0e0 transparent' :
                                                '#e0e0e0 transparent transparent transparent',
                                    zIndex: 1000
                                }}
                            />

                            {/* Hình ảnh demo */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '200px',
                                backgroundColor: '#f5f5f5'
                            }}>
                                <Image
                                    src={hoveredArea.demoImage}
                                    alt={`Demo ${hoveredArea.title}`}
                                    fill
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                />
                                {/* Overlay gradient */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '70px',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '16px 20px'
                                }}>
                                    <h3 style={{
                                        margin: 0,
                                        color: 'white',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                                    }}>
                                        {hoveredArea.title}
                                    </h3>
                                </div>

                                {/* Nút đóng */}
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => {
                                        // Clear timeout và đóng popup ngay lập tức
                                        if (hideTimeoutId) {
                                            clearTimeout(hideTimeoutId);
                                            setHideTimeoutId(null);
                                        }
                                        setHoveredArea(null);
                                        setIsHoveringPopup(false);
                                        setIsHoveringHotspot(false);
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            {/* Nội dung mô tả - có thể cuộn */}
                            <div style={{
                                padding: '20px',
                                maxHeight: `${Math.min(popupHeight, window.innerHeight - 40) - 200}px`,
                                overflowY: 'auto',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#cbd5e0 #f7fafc'
                            }}>
                                {/* Mô tả ngắn */}
                                <p style={{
                                    margin: '0 0 14px 0',
                                    color: '#666',
                                    fontSize: '14px',
                                    fontStyle: 'italic',
                                    textAlign: 'center'
                                }}>
                                    {hoveredArea.description}
                                </p>

                                {/* Mô tả chi tiết */}
                                <p style={{
                                    margin: '0 0 18px 0',
                                    color: '#333',
                                    fontSize: '14px',
                                    lineHeight: '1.6',
                                    textAlign: 'justify'
                                }}>
                                    {hoveredArea.fullDescription}
                                </p>

                                {/* Danh sách tiện ích */}
                                <div style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '14px',
                                    borderRadius: '10px',
                                    border: '1px solid #e9ecef'
                                }}>
                                    <h4 style={{
                                        margin: '0 0 10px 0',
                                        color: '#495057',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        textAlign: 'center'
                                    }}>
                                        🎯 Tiện ích & Dịch vụ
                                    </h4>
                                    <div style={{
                                        display: 'grid',
                                        gap: '6px'
                                    }}>
                                        {hoveredArea.details.map((detail, index) => (
                                            <div key={index} style={{
                                                fontSize: '13px',
                                                lineHeight: '1.5',
                                                color: '#6c757d',
                                                padding: '2px 0'
                                            }}>
                                                {detail}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}

            {/* CSS Animation cho popup */}
            <style jsx>{`
                @keyframes popupSlideIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>

            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10
            }}>
                <button
                    className="back-button"
                    onClick={onBack}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    ← Quay lại
                </button>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '10px 20px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ margin: '0 0 5px 0', color: '#333' }}>Tầng Trệt</h2>
                <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                    {hoveredArea
                        ? `Đang xem: ${hoveredArea.title}`
                        : 'Di chuyển chuột để xem thông tin các khu vực'
                    }
                </p>
            </div>
        </div>
    );
}
