'use client';

import { useEffect, useState } from 'react';
import './components.css';
import Floor1 from './components/Floor1';
import Floor2 from './components/Floor2';
import Floor3 from './components/Floor3';
import Floor4 from './components/Floor4';
import Floor5 from './components/Floor5';

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div>
            <div className="floors-container">
              <div className="floor-box" onClick={() => setActiveTab('floor1')}>
                <span>Tầng 1</span>
              </div>
              <div className="floor-box" onClick={() => setActiveTab('floor2')}>
                <span>Tầng 2</span>
              </div>
              <div className="floor-box" onClick={() => setActiveTab('floor3')}>
                <span>Tầng 3</span>
              </div>
              <div className="floor-box" onClick={() => setActiveTab('floor4')}>
                <span>Tầng 4</span>
              </div>
              <div className="floor-box" onClick={() => setActiveTab('floor5')}>
                <span>Tầng 5</span>
              </div>
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
      case 'features':
        return (
          <div>
            <h2>Tính năng website</h2>
            <ul>
              <li>✅ Giao diện responsive</li>
              <li>✅ Đa ngôn ngữ (Việt/Anh)</li>
              <li>✅ Thông tin dự án chi tiết</li>
              <li>✅ Form liên hệ trực tuyến</li>
              <li>✅ Bản đồ tương tác</li>
              <li>✅ Gallery hình ảnh</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2>Thông tin liên hệ</h2>
            <p><strong>Website:</strong> https://amatavn.com/vi/</p>
            <p><strong>Địa chỉ:</strong> Khu công nghiệp AMATA</p>
            <p><strong>Điện thoại:</strong> Xem trên website chính thức</p>
            <p><strong>Email:</strong> Xem trên website chính thức</p>
          </div>
        );
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
      )}
    </div>
  );
}
