'use client';

import { useEffect, useState } from 'react';
import './components.css';
import Floor1 from './components/Floor1';
import Floor2 from './components/Floor2';
import Floor3 from './components/Floor3';
import Floor4 from './components/Floor4';
import Floor5 from './components/Floor5';

export default function Home() {
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.area1.minWidth,
              maxWidth: areaPositions.area1.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => handleFloorTransition('floor1')}t Floor2 from './components/Floor2';
import Floor3 from './components/Floor3';
import Floor4 from './components/Floor4';
import Floor5 from './components/Floor5';

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFloor, setShowFloor] = useState(false);

  const handleFloorTransition = (floorTab: string) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(floorTab);
      setShowFloor(true);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBackToInfo = () => {
    setIsTransitioning(true);
    setShowFloor(false);
    
    setTimeout(() => {
      setActiveTab('info');
      setIsTransitioning(false);
    }, 300);
  };

  const renderTabContent = () => {
    // Cấu hình vị trí cho từng khu vực (có thể thay đổi dễ dàng)
    const areaPositions = {
      ground: { top: '10%', left: '5%', minWidth: '380px', maxWidth: '450px' },
      area1: { top: '35%', left: '5%', minWidth: '360px', maxWidth: '420px' },
      area2: { top: '60%', left: '5%', minWidth: '400px', maxWidth: '580px' },
      area3: { top: '20%', left: '50%', minWidth: '420px', maxWidth: '520px' },
      area4: { top: '60%', left: '50%', minWidth: '390px', maxWidth: '460px' }
    };

    switch (activeTab) {
      case 'info':
        return (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            padding: '20px',
            overflow: 'hidden'
          }}>
            {/* Ground Floor Area - G */}
            <div style={{
              position: 'absolute',
              top: areaPositions.ground.top,
              left: areaPositions.ground.left,
              background: '#ffffff',
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.ground.minWidth,
              maxWidth: areaPositions.ground.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => handleFloorTransition('floor1')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '20px',
                background: '#6c757d',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 'bold',
                border: '4px solid white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}>
                G
              </div>
              <div>
                <ul style={{ margin: 0, paddingLeft: '16px', color: '#666', fontSize: '1.06rem', lineHeight: '1.3' }}>
                  <li>R001 NHÀ HÀNG NHẬT BẢN THIÊN QUẾ</li>
                  <li>R002 VIETCOMBANK</li>
                  <li>CAFE AMAZON</li>
                  <li>MINAMOT</li>
                </ul>
              </div>
            </div>

            {/* Area 1 */}
            <div style={{
              position: 'absolute',
              top: areaPositions.area1.top,
              left: areaPositions.area1.left,
              background: '#ffffff',
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.area1.minWidth,
              maxWidth: areaPositions.area1.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => setActiveTab('floor1')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '20px',
                background: '#28a745',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                border: '4px solid white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}>
                1
              </div>
              <ul style={{ margin: '6px 0', paddingLeft: '16px', color: '#666', fontSize: '1.06rem', lineHeight: '1.3' }}>
                <li>VĂN PHÒNG AMATA BIÊN HÒA</li>
                <li>R101 NGÂN HÀNG E.SUN</li>
              </ul>
            </div>

            {/* Area 2 */}
            <div style={{
              position: 'absolute',
              top: areaPositions.area2.top,
              left: areaPositions.area2.left,
              background: '#ffffff',
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.area2.minWidth,
              maxWidth: areaPositions.area2.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => setActiveTab('floor2')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '20px',
                background: '#007bff',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                border: '4px solid white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}>
                2
              </div>
              <ul style={{ margin: '6px 0', paddingLeft: '16px', color: '#666', fontSize: '1.06rem', lineHeight: '1.3' }}>
                <li>R201 - R202 VTL</li>
                <li>R203 SHIN YOU</li>
                <li>R204 NISSIN LOGISTIC</li>
                <li>R205 - R209 NGÂN HÀNG E.SUN</li>
              </ul>
            </div>

            {/* Area 3 */}
            <div style={{
              position: 'absolute',
              top: areaPositions.area3.top,
              left: areaPositions.area3.left,
              background: '#ffffff',
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.area3.minWidth,
              maxWidth: areaPositions.area3.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => setActiveTab('floor3')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '20px',
                background: '#17a2b8',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                border: '4px solid white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}>
                3
              </div>
              <ul style={{ margin: '6px 0', paddingLeft: '16px', color: '#666', fontSize: '1.06rem', lineHeight: '1.3' }}>
                <li>R301 HOC TRANS</li>
                <li>R302 FUJIFILM</li>
                <li>R303 YUSEN LOGISTIC</li>
                <li>R304 BEE LOGISTIC</li>
                <li>R305 DAEHO SPECIAL STEEL</li>
                <li>R306A MELODY LOGISTIC</li>
                <li>R306B IDSV</li>
                <li>R306C MAP PACIFIC</li>
                <li>R307 NNR GLOBAL LOGISTIC</li>
                <li>R308 GOODVIEW</li>
                <li>R309 FUJITA CORPORATION</li>
                <li>R310 ASIA DRAGON</li>
              </ul>
            </div>

            {/* Area 4 */}
            <div style={{
              position: 'absolute',
              top: areaPositions.area4.top,
              left: areaPositions.area4.left,
              background: '#ffffff',
              padding: '25px 15px 15px 15px',
              borderRadius: '15px',
              border: '1px solid #e9ecef',
              width: 'fit-content',
              minWidth: areaPositions.area4.minWidth,
              maxWidth: areaPositions.area4.maxWidth,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              transform: 'translateY(0)',
              cursor: 'pointer',
              zIndex: 1
            }}
              onClick={() => setActiveTab('floor4')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.zIndex = '1';
              }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '20px',
                background: '#dc3545',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                border: '4px solid white',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}>
                4
              </div>
              <ul style={{ margin: '6px 0', paddingLeft: '16px', color: '#666', fontSize: '1.06rem', lineHeight: '1.3' }}>
                <li>R401 -1 VVMV</li>
                <li>R401 -2 MS METAL</li>
                <li>R401 -3 MAX WOOD</li>
                <li>R401 -4 TS LOGISTIC</li>
                <li>R401 -5 VNICI</li>
                <li>R402 CHUBB</li>
                <li>R403 CANTEEN</li>
              </ul>
            </div>
          </div>
        );
      case 'floor1':
        return <Floor1 onBack={() => setActiveTab('info')} />;
      case 'floor2':
        return <Floor2 onBack={() => setActiveTab('info')} />;
      case 'floor3':
        return <Floor3 onBack={() => setActiveTab('info')} />;
      case 'floor4':
        return <Floor4 onBack={() => setActiveTab('info')} />;
      case 'floor5':
        return <Floor5 onBack={() => setActiveTab('info')} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <button
        className="detail-button"
        onClick={() => setShowDetails(true)}
      >
        Xem chi tiết
      </button>

      <div className="iframe-container">
        <iframe
          src="https://amatavn.com/vi/"
          width="100%"
          height="100%"
          style={{
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block'
          }}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

      {showDetails && (
        <div className="details-panel">
          {activeTab === 'info' ? (
            <div className="details-container">
              {/* Cột trái - Nội dung */}
              <div className="content-column">
                <div className="tab-content">
                  <button
                    className="close-button-content"
                    onClick={() => setShowDetails(false)}
                  >
                    Đóng
                  </button>
                  {renderTabContent()}
                </div>
              </div>

              {/* Cột phải - Video */}
              <div className="video-column">
                <video
                  autoPlay
                  muted
                  loop
                >
                  <source src="/amata-video.mp4" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              </div>
            </div>
          ) : (
            // Floor views take full screen
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <button
                className="close-button-content"
                onClick={() => setShowDetails(false)}
                style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}
              >
                Đóng
              </button>
              {renderTabContent()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
