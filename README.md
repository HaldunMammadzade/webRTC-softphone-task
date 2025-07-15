# WebRTC Softphone

React və TypeScript əsaslı WebRTC Softphone UI tətbiqi. Bu layihə mikrofon access-i, audio streaming və zəng idarəetmə funksiyalarını təmin edir.

## 🎯 Məqsəd

Bu tətbiq aşağıdakı tələbləri həyata keçirir:
- İstifadəçinin cihazındakı mikrofonuna çıxış əldə edilməsi
- WebRTC API-larından istifadə etməklə zəng simulyasiyasının qurulması
- Zəngi başlatmaq, səssizə almaq/səsliyə almaq və sonlandırmaq üçün düymələr
- Zəngin statusunun və müddətinin real-time göstərilməsi

## 🚀 Əsas Xüsusiyyətlər

### ✨ Funksional Tələblər
- **Zəngi Başlat**: Mikrofon icazəsi tələb edir və lokal audio strimi göstərir
- **Mute/Unmute**: Audio track-ları aktiv/deaktiv edir
- **Zəngi Sonlandır**: Streaming-i dayandırır və UI-nı təmizləyir
- **Status Göstərmə**: Zəng statusu və canlı müddət (mm:ss formatında)

### 🔧 Texniki Xüsusiyyətlər
- React 18 + TypeScript
- WebRTC API-ləri
- Responsive CSS dizayn
- Professional kod strukturu
- Comprehensive error handling
- Browser compatibility yoxlanması

## 📋 Sistem Tələbləri

### Minimum Tələblər
- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0
- **Browser**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+

### Browser Dəstəyi
- WebRTC API dəstəyi
- getUserMedia API dəstəyi
- Modern ES6+ dəstəyi

## 🛠️ Qurulum Təlimatları

### 1. Layihəni Klonlayın
```bash
git clone https://github.com/username/webrtc-softphone.git
cd webrtc-softphone
```

### 2. Dependencies Quraşdırın
```bash
npm install
```

### 3. Development Server Başladın
```bash
npm start
```

Tətbiq `http://localhost:3000` ünvanında işləyəcək.

### 4. Production Build
```bash
npm run build
```

## 📁 Layihə Strukturu

```
src/
├── components/           # React komponentləri
│   ├── CallInterface.tsx    # Əsas zəng interfeysi
│   ├── CallStatus.tsx       # Status və timer göstərmə
│   ├── CallControls.tsx     # Zəng idarəetmə düymələri
│   └── AudioPlayer.tsx      # Audio element komponenti
├── hooks/               # Custom React hooks
│   ├── useWebRTC.ts        # WebRTC funksiyaları
│   └── useTimer.ts         # Timer idarəetmə
├── types/               # TypeScript tərifləri
│   └── index.ts            # Bütün type definitions
├── utils/               # Utility funksiyaları
│   ├── timeUtils.ts        # Vaxt formatlaşdırma
│   └── audioUtils.ts       # Audio yardımçı funksiyalar
├── App.tsx              # Əsas komponent
├── App.css              # Stillər
└── index.tsx            # Entry point
```

## 🎮 İstifadə Təlimatları

### Zəngi Başlatmaq
1. "Zəngi başlat" düyməsinə basın
2. Browser-də mikrofon icazəsi verin
3. Audio stream aktivləşəcək və timer başlayacaq

### Zəng Zamanı
- **Səssizə almaq**: "Səssizə al" düyməsi ilə audio track-ları deaktiv edin
- **Səsliyə almaq**: "Səsliyə al" düyməsi ilə audio-nu yenidən aktivləşdirin
- **Status izləmək**: Real-time status və müddət məlumatlarını görün

### Zəngi Sonlandırmaq
1. "Zəngi sonlandır" düyməsinə basın
2. Bütün audio stream-lər dayandırılacaq
3. Timer sıfırlanacaq və UI təmizlənəcək

## 🎨 UI/UX Xüsusiyyətləri

### Vizual Elementlər
- Modern gradient background
- Animated status indicators
- Responsive button design
- Professional color scheme
- Mobile-friendly layout

### Status İndikatorları
- **Gözləmə**: Mavi rəng
- **Qoşulur**: Narıncı rəng (animasiyalı)
- **Davam edən**: Yaşıl rəng (animasiyalı)
- **Sonlandı**: Qırmızı rəng

## 🔍 Debugging və Logging

Tətbiq console-da ətraflı loglar göstərir:

```javascript
// Media streaming events
console.log('Mikrofon icazəsi alındı:', stream);
console.log('Audio track məlumatları:', audioTracks);
console.log('Mute statusu dəyişdirildi:', isMuted);

// Timer events
console.log('Timer başladı');
console.log('Timer: 01:23');

// WebRTC events
console.log('Audio track sonlandı');
console.log('Stream təmizləndi');
```

## 🔧 Əlavə Scripts

```bash
# Linting
npm run lint          # ESLint yoxlanması
npm run lint:fix      # Avtomatik düzəltmə

# Type Checking
npm run type-check    # TypeScript yoxlanması

# Testing
npm test             # Test suite işlədir
```

## 🌐 Browser Compatibility

| Browser | Minimum Version | WebRTC Support | getUserMedia |
|---------|----------------|----------------|--------------|
| Chrome  | 88+            | ✅              | ✅            |
| Firefox | 78+            | ✅              | ✅            |
| Safari  | 14+            | ✅              | ✅            |
| Edge    | 88+            | ✅              | ✅            |

## 🚨 Troubleshooting

### Ümumi Problemlər

**Mikrofon icazəsi verilmir**
- Browser settings-də mikrofon icazəsini yoxlayın
- HTTPS connection istifadə edin (HTTP-də işləməz)
- Browser-i yenidən başladın

**Audio stream yaranmır**
- Mikrofonun düzgün qoşulduğunu yoxlayın
- Başqa tətbiqlərin mikrofonu istifadə etmədiyini təsdiqləyin
- Browser console-da error mesajlarını yoxlayın

**Timer işləmir**
- JavaScript-in aktiv olduğunu təsdiqləyin
- Browser developer tools-da error-ları yoxlayın

### Developer Console
F12 ilə developer tools açın və aşağıdakıları yoxlayın:
- Console tab-da error mesajları
- Network tab-da resource loading
- Application tab-da permissions

## 📝 Əlavə Məlumatlar

### WebRTC API Reference
- [MDN WebRTC Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [getUserMedia API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

### React + TypeScript
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)

## 📄 Lisenziya

MIT License - Detallı məlumat üçün LICENSE faylına baxın.

## 👤 Müəllif

Haldun Mammadzada
- Email: haldun.mammadzada@gmail.com
<!-- - GitHub: [@username](https://github.com/username) -->

## 🤝 Töhfə vermək

1. Fork edin
2. Feature branch yaradın (`git checkout -b feature/yeni-xususiyyet`)
3. Commit edin (`git commit -am 'Yeni xüsusiyyət əlavə edildi'`)
4. Push edin (`git push origin feature/yeni-xususiyyet`)
5. Pull Request yaradın

---

**Qeyd**: Bu layihə WebRTC simulyasiyası üçün hazırlanmışdır və real zəng funksiyası yoxdur. Production istifadəsi üçün signal server və STUN/TURN serverləri lazımdır.