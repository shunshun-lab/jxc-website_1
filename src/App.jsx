import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { 
  ChevronRight, 
  ChevronDown,
  ExternalLink, 
  Users, 
  Target, 
  Lightbulb,
  Calendar,
  MapPin,
  Clock,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  BookOpen,
  Award,
  TrendingUp,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Upload,
  Search,
  Filter,
  Sort,
  Grid,
  List,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Home,
  User,
  Bell,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['hero', 'community', 'media', 'books', 'concept', 'event', 'team', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_PUBLIC_KEY'
      )
      alert('メッセージが送信されました！')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      alert('送信に失敗しました。もう一度お試しください。')
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              JXC
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'community', 'media', 'books', 'concept', 'event', 'team', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['hero', 'community', 'media', 'books', 'concept', 'event', 'team', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white w-full text-left"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="text-center z-10 px-4"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Japan X College
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Z世代のための革新的コミュニティ
          </motion.p>
          <motion.button
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors inline-flex items-center gap-2"
            onClick={() => scrollToSection('community')}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            コミュニティに参加
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-10 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section id="community" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              コミュニティの実績
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Japan X Collegeは急速に成長するコミュニティです
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1,000+", label: "アクティブメンバー", icon: Users },
              { number: "50+", label: "開催イベント", icon: Calendar },
              { number: "95%", label: "満足度", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              メディア・記事
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              最新の記事やメディア掲載情報をお届けします
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Z世代の起業トレンド2024",
                description: "最新の起業動向と成功事例を分析",
                date: "2024年1月15日",
                category: "トレンド"
              },
              {
                title: "コミュニティ運営の秘訣",
                description: "効果的なコミュニティ構築方法",
                date: "2024年1月10日",
                category: "運営"
              },
              {
                title: "キャリア形成のヒント",
                description: "若手社会人のためのキャリア戦略",
                date: "2024年1月5日",
                category: "キャリア"
              }
            ].map((article, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  {article.category}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{article.title}</h3>
                <p className="text-gray-300 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{article.date}</span>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              出版・書籍
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              コミュニティの知見を書籍として発信しています
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <BookOpen className="w-16 h-16 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  「Z世代のキャリア戦略」
                </h3>
                <p className="text-gray-300 mb-6">
                  現代の若者が直面するキャリアの課題と、それを乗り越えるための実践的な戦略を詳しく解説した一冊です。
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>出版予定: 2024年春</div>
                  <div>著者: Japan X College編集部</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <Award className="w-16 h-16 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  「コミュニティ運営の教科書」
                </h3>
                <p className="text-gray-300 mb-6">
                  成功するコミュニティの作り方から運営のコツまで、実体験に基づいたノウハウを公開します。
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>出版予定: 2024年夏</div>
                  <div>著者: Japan X College創設メンバー</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              コンセプト
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              私たちのミッション・ビジョン・価値観
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "ミッション",
                description: "Z世代の可能性を最大化し、社会に新しい価値を創造する"
              },
              {
                icon: Lightbulb,
                title: "ビジョン",
                description: "革新的なアイデアと行動力で未来を切り拓く人材を育成する"
              },
              {
                icon: Heart,
                title: "価値観",
                description: "多様性を尊重し、協力し合いながら成長する文化を築く"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section id="event" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              イベント情報
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              定期的に開催される様々なイベントにご参加ください
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "月次ネットワーキング",
                date: "毎月第3土曜日",
                time: "14:00-17:00",
                location: "東京・渋谷",
                spots: "残り8席",
                description: "メンバー同士の交流とビジネスマッチングの機会"
              },
              {
                title: "スキルアップワークショップ",
                date: "2024年2月10日",
                time: "10:00-16:00",
                location: "オンライン",
                spots: "残り15席",
                description: "実践的なスキル習得のための集中講座"
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    {event.spots}
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  参加申し込み
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              チーム紹介
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Japan X Collegeを支える情熱的なメンバーたち
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "田中 太郎",
                role: "代表・創設者",
                description: "起業家として複数の事業を立ち上げ、Z世代の可能性を信じてコミュニティを設立。"
              },
              {
                name: "佐藤 花子",
                role: "コミュニティマネージャー",
                description: "メンバーサポートとイベント企画を担当。コミュニティの成長を支える。"
              },
              {
                name: "山田 次郎",
                role: "コンテンツディレクター",
                description: "教育コンテンツの企画・制作を担当。質の高い学習体験を提供。"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-24 h-24 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-purple-400 mb-4">{member.role}</div>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              お問い合わせ
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ご質問やご相談がございましたら、お気軽にお問い合わせください
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">連絡先情報</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-300">contact@japanxcollege.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-300">03-1234-5678</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-purple-400" />
                    <span className="text-gray-300">東京都渋谷区〇〇 1-2-3</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">SNSでフォロー</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: Twitter, href: "#" },
                      { icon: Instagram, href: "#" },
                      { icon: Linkedin, href: "#" },
                      { icon: Youtube, href: "#" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                      >
                        <social.icon className="w-6 h-6 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      お名前
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="山田太郎"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      メッセージ
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="お問い合わせ内容をご記入ください"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">Japan X College</div>
            <p className="text-gray-400 mb-8">Z世代のための革新的コミュニティ</p>
            <div className="border-t border-white/20 pt-8">
              <p className="text-gray-500 text-sm">
                © 2024 Japan X College. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

