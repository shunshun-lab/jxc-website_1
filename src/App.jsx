import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
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
  MessageCircle,
  Menu,
  X,
  RotateCcw,
  FileText,
  Download,
  Play
} from 'lucide-react'
import './App.css'

// Import assets
import jxcLogo from './assets/jxc_logo.png'
import heroImage from './assets/hero_image_updated.png'
import missionIcon from './assets/mission_icon.png'
import visionIcon from './assets/vision_icon.png'
import valuesIcon from './assets/values_icon.png'
import lineIcon from './assets/line_icon.png'
import xIcon from './assets/x_icon.png'
import noteIcon from './assets/note_icon.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  // EmailJS初期化
  useEffect(() => {
    emailjs.init("BzQol5iPjmO65kep0")
  }, [])

  // フォーム入力ハンドラー
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // メール送信ハンドラー
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // EmailJSでメール送信
      const result = await emailjs.send(
        'japanxcollege_hp_1',
        'template_bq39xds',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      )

      console.log('メール送信成功:', result)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('メール送信エラー:', error)
      console.error('エラー詳細:', error.text || error.message || error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // スクロール関数
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Sample data
  const articles = [
    {
      id: 1,
      title: "Z世代が考える未来の働き方",
      excerpt: "リモートワークとAIの普及により、従来の働き方が大きく変化している中で、Z世代はどのような価値観を持って...",
      date: "2024-05-15",
      readTime: "5分",
      tags: ["働き方", "AI", "Z世代"]
    },
    {
      id: 2,
      title: "Web3時代のコミュニティ運営",
      excerpt: "ブロックチェーン技術を活用したDAOの概念が注目される中、新しいコミュニティの在り方について考察...",
      date: "2024-05-10",
      readTime: "7分",
      tags: ["Web3", "DAO", "コミュニティ"]
    },
    {
      id: 3,
      title: "金融包摂とDeFiの可能性",
      excerpt: "従来の金融システムから取り残された人々に対して、分散型金融（DeFi）がもたらす新たな機会について...",
      date: "2024-05-05",
      readTime: "6分",
      tags: ["DeFi", "金融包摂", "ブロックチェーン"]
    }
  ]

  const events = [
    {
      id: 1,
      title: "Z世代起業家ピッチイベント",
      date: "2024-07-15",
      time: "19:00-21:00",
      location: "オンライン",
      capacity: 50,
      remaining: 12,
      status: "募集中",
      description: "Z世代の起業家が自身のビジネスアイデアをピッチし、投資家やメンターからフィードバックを受けるイベント..."
    },
    {
      id: 2,
      title: "Web3技術勉強会",
      date: "2024-07-22",
      time: "14:00-17:00",
      location: "東京・渋谷",
      capacity: 30,
      remaining: 8,
      status: "開催予定",
      description: "ブロックチェーン技術とDeFiの基礎から応用まで、実践的なワークショップを通じて学びます。"
    },
    {
      id: 3,
      title: "グローバル交流セッション",
      date: "2024-08-05",
      time: "20:00-22:00",
      location: "オンライン",
      capacity: 100,
      remaining: 45,
      status: "準備中",
      description: "海外のZ世代コミュニティとの交流セッション。英語でのディスカッションとネットワーキング。"
    },
    {
      id: 4,
      title: "ブロックチェーン基礎講座",
      date: "2024-06-20",
      time: "14:00-17:00",
      location: "東京・新宿",
      capacity: 25,
      remaining: 0,
      status: "開催済み",
      description: "ブロックチェーンの基礎概念から実装まで、初心者向けの包括的な講座でした。",
      archiveVideo: "/archive/blockchain-basics",
      archiveResources: "/resources/blockchain-basics.pdf"
    }
  ]

  const teamMembers = [
    {
      id: 1,
      name: "田中 太郎",
      role: "代表・ファウンダー",
      bio: "Web3とAI技術に精通し、Z世代のエンパワーメントに情熱を注ぐ。東京大学経済学部卒業後、複数のスタートアップを経験。",
      skills: ["Web3", "起業", "コミュニティ運営"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "佐藤 花子",
      role: "CTO・技術責任者",
      bio: "ブロックチェーン開発のエキスパート。分散型アプリケーションの設計・開発を得意とし、技術教育にも力を入れている。",
      skills: ["ブロックチェーン", "DApp開発", "技術教育"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "山田 次郎",
      role: "コミュニティマネージャー",
      bio: "グローバルなコミュニティ運営の経験を持ち、多様なバックグラウンドを持つメンバーをつなぐ役割を担っている。",
      skills: ["コミュニティ運営", "イベント企画", "多言語対応"],
      image: "/api/placeholder/150/150"
    }
  ]

  const values = [
    "巨人の肩に正しく乗れ",
    "最適な振る舞いを考えよ", 
    "愛は多数に,信頼は少数に",
    "人生の保険を作れ",
    "ミクロとマクロを同時に見よ"
  ]

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case '募集中':
        return 'bg-green-100 text-green-800'
      case '開催予定':
        return 'bg-blue-100 text-blue-800'
      case '準備中':
        return 'bg-yellow-100 text-yellow-800'
      case '開催済み':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src={jxcLogo} alt="JXC Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-green-800">Japan X College</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('media')} className="text-gray-700 hover:text-green-600 transition-colors">
                MEDIA
              </button>
              <button onClick={() => scrollToSection('books')} className="text-gray-700 hover:text-green-600 transition-colors">
                BOOKS
              </button>
              <button onClick={() => scrollToSection('concept')} className="text-gray-700 hover:text-green-600 transition-colors">
                CONCEPT
              </button>
              <button onClick={() => scrollToSection('event')} className="text-gray-700 hover:text-green-600 transition-colors">
                EVENT
              </button>
              <button onClick={() => scrollToSection('team')} className="text-gray-700 hover:text-green-600 transition-colors">
                TEAM
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 transition-colors">
                CONTACT
              </button>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA" target="_blank" rel="noopener noreferrer">
                <img src={lineIcon} alt="LINE" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://x.com/japan_x_college" target="_blank" rel="noopener noreferrer">
                <img src={xIcon} alt="X (Twitter)" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://note.com/japan_x_college" target="_blank" rel="noopener noreferrer">
                <img src={noteIcon} alt="Note" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button onClick={() => scrollToSection('media')} className="block w-full text-left text-gray-700 hover:text-green-600">
              MEDIA
            </button>
            <button onClick={() => scrollToSection('books')} className="block w-full text-left text-gray-700 hover:text-green-600">
              BOOKS
            </button>
            <button onClick={() => scrollToSection('concept')} className="block w-full text-left text-gray-700 hover:text-green-600">
              CONCEPT
            </button>
            <button onClick={() => scrollToSection('event')} className="block w-full text-left text-gray-700 hover:text-green-600">
              EVENT
            </button>
            <button onClick={() => scrollToSection('team')} className="block w-full text-left text-gray-700 hover:text-green-600">
              TEAM
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-green-600">
              CONTACT
            </button>
            <div className="flex items-center space-x-4 pt-4">
              <a href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA" target="_blank" rel="noopener noreferrer">
                <img src={lineIcon} alt="LINE" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://x.com/japan_x_college" target="_blank" rel="noopener noreferrer">
                <img src={xIcon} alt="X (Twitter)" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://note.com/japan_x_college" target="_blank" rel="noopener noreferrer">
                <img src={noteIcon} alt="Note" className="h-6 w-6 hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Japan X College
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 leading-relaxed">
                一次情報 × AI編集 × 多言語発信で、Z世代の挑戦を未来のスタンダードへ
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => scrollToSection('media')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  記事を読む
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.a
                  href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  参加する (OpenChat)
                  <ExternalLink className="ml-2 h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={heroImage} 
                alt="Japan X College Hero" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section id="community-stats" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">54</div>
                <div className="text-gray-600">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                  📝 33
                </div>
                <div className="text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                  🚀 7
                </div>
                <div className="text-gray-600">Startups born</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                  🌍 3
                </div>
                <div className="text-gray-600">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 flex items-center justify-center">
                  👥 1000+
                </div>
                <div className="text-gray-600">Total Followers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              JXC Media – 今を切り取り、未来を描く
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Z世代20人を定点取材、AIが多言語記事化。月20本を世界へ。
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Badge variant="outline" className="text-lg px-4 py-2">
                33 Articles
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                15 Topics
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                3 Languages
              </Badge>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <span className="text-sm text-green-600">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              記事をすべて見る
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              JXC Books – 未来を創るためのリーディングリスト
            </h2>
          </motion.div>

          {/* Featured Book */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <div className="w-64 h-80 mx-auto bg-gradient-to-br from-green-600 to-blue-600 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-4 bg-white rounded-lg flex flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Z世代のための</h3>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Web3ガイドブック</h3>
                    </div>
                    <div className="text-sm text-gray-600">
                      Japan X College
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
                  Z世代必読！
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Z世代のためのWeb3ガイドブック</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ブロックチェーン、DeFi、NFTなど、Web3の基礎から実践まで、Z世代の視点で分かりやすく解説した必読書です。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <FileText className="mr-2 h-5 w-5" />
                  サンプルを読む（PDF 20p）
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  購入する
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Upcoming Books */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">今後の刊行予定</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">AI時代のキャリア設計術</CardTitle>
                  <Badge variant="secondary" className="w-fit">2024Q4</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI技術の進歩により変化する労働市場において、Z世代がキャリアを築くための戦略的アプローチを解説。
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">DAO運営ハンドブック</CardTitle>
                  <Badge variant="secondary" className="w-fit">2025Q1</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    分散型自律組織（DAO）の設立から運営まで、実践的なノウハウとベストプラクティスを網羅。
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">CONCEPT</h2>
            <p className="text-xl text-gray-600">私たちのミッション、ビジョン、そして大切にしている価値観</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src={missionIcon} alt="Mission" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Target className="h-6 w-6 text-green-600" />
                    MISSION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Z世代の可能性を最大限に引き出し、Web3とAI技術を通じて新しい価値を創造するコミュニティを構築する
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src={visionIcon} alt="Vision" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                    VISION
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    テクノロジーと人間性が調和した未来社会において、Z世代がリーダーシップを発揮できる世界を実現する
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src={valuesIcon} alt="Values" className="w-full h-full object-contain" />
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Users className="h-6 w-6 text-green-600" />
                    VALUES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    革新性、包摂性、持続可能性を核とし、多様性を尊重しながら共に成長していく価値観を大切にする
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900">行動指針</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600"
                >
                  <p className="font-medium text-gray-800">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Section */}
      <section id="event" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">EVENT</h2>
            <p className="text-xl text-gray-600">Z世代のためのイベントやワークショップで、共に学び、成長しましょう</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getStatusBadgeColor(event.status)}>
                        {event.status}
                      </Badge>
                      {event.status !== '開催済み' && (
                        <Badge variant="outline" className="text-sm">
                          残席{event.remaining}/{event.capacity}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    {event.status === '開催済み' ? (
                      <div className="flex flex-col gap-2">
                        {event.archiveVideo && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Play className="mr-2 h-4 w-4" />
                            アーカイブ動画を見る
                          </Button>
                        )}
                        {event.archiveResources && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            資料をダウンロード
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        詳細を見る
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">TEAM</h2>
            <p className="text-xl text-gray-600">多様なバックグラウンドを持つメンバーが、共通のビジョンのもとに集結</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                    <p className="text-green-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">CONTACT</h2>
            <p className="text-xl text-gray-600">ご質問、ご相談、コラボレーションのご提案など、お気軽にお問い合わせください</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>お問い合わせフォーム</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">お名前 *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">メールアドレス *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">件名 *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">メッセージ *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? '送信中...' : '送信する'}
                    </Button>
                    {submitStatus === 'success' && (
                      <p className="text-green-600 text-center">メッセージが送信されました！</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-red-600 text-center">送信に失敗しました。もう一度お試しください。</p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">連絡先情報</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span>info@japanxcollege.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span>03-1234-5678</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">SNSでつながろう</h3>
                <div className="flex gap-4">
                  <a href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <img src={lineIcon} alt="LINE" className="h-6 w-6" />
                    LINE
                  </a>
                  <a href="https://x.com/japan_x_college" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <img src={xIcon} alt="X (Twitter)" className="h-6 w-6" />
                    X (Twitter)
                  </a>
                  <a href="https://note.com/japan_x_college" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <img src={noteIcon} alt="Note" className="h-6 w-6" />
                    Note
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">コミュニティ参加</h3>
                <p className="text-gray-600 mb-4">
                  Japan X Collegeのコミュニティに参加して、同世代の仲間たちと一緒に学び、成長しませんか？
                </p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <a href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    コミュニティに参加
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={jxcLogo} alt="JXC Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">Japan X College</span>
              </div>
              <p className="text-gray-400">Z世代のための革新的コミュニティ</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">コンテンツ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('media')} className="hover:text-white transition-colors">MEDIA</button></li>
                <li><button onClick={() => scrollToSection('books')} className="hover:text-white transition-colors">BOOKS</button></li>
                <li><button onClick={() => scrollToSection('concept')} className="hover:text-white transition-colors">CONCEPT</button></li>
                <li><button onClick={() => scrollToSection('event')} className="hover:text-white transition-colors">EVENT</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">コミュニティ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('team')} className="hover:text-white transition-colors">TEAM</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">CONTACT</button></li>
                <li><a href="https://line.me/ti/g2/d8HkyJBwniJUWprcih9E9h3VgUjG5K2Xb1_iIA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINE</a></li>
                <li><a href="https://x.com/japan_x_college" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">連絡先</h4>
              <p className="text-gray-400">japanxcollege@gmail.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Japan X College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

