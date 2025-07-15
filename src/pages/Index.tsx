import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');
  const [distance, setDistance] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const cargoTypes = [
    { value: 'standard', label: '📦 Стандартный груз', multiplier: 1, emoji: '📦' },
    { value: 'fragile', label: '🍃 Хрупкий груз', multiplier: 1.3, emoji: '🍃' },
    { value: 'dangerous', label: '⚠️ Опасный груз', multiplier: 1.8, emoji: '⚠️' },
    { value: 'oversized', label: '📏 Негабаритный груз', multiplier: 2.2, emoji: '📏' },
    { value: 'food', label: '🍎 Продукты питания', multiplier: 1.5, emoji: '🍎' }
  ];

  const vehicleTypes = [
    { value: 'bike', label: '🏍️ Мотокурьер (до 20кг)', baseRate: 15, emoji: '🏍️' },
    { value: 'gazelle', label: '🚐 Газель (до 1.5т)', baseRate: 25, emoji: '🚐' },
    { value: 'truck', label: '🚛 Фура (до 20т)', baseRate: 45, emoji: '🚛' },
    { value: 'drone', label: '🚁 Дрон (до 5кг)', baseRate: 35, emoji: '🚁' }
  ];

  const urgencyLevels = [
    { value: 'standard', label: '⏰ Стандартная (3-5 дней)', multiplier: 1 },
    { value: 'express', label: '⚡ Экспресс (1-2 дня)', multiplier: 1.5 },
    { value: 'instant', label: '🚀 Мгновенная (в тот же день)', multiplier: 2.5 }
  ];

  const services = [
    { id: 'packaging', label: '📦 Упаковка', price: 500, icon: '📦' },
    { id: 'loading', label: '💪 Погрузка/выгрузка', price: 1500, icon: '💪' },
    { id: 'insurance', label: '🛡️ Страхование', price: 800, icon: '🛡️' },
    { id: 'tracking', label: '📱 GPS трекинг', price: 300, icon: '📱' },
    { id: 'photo', label: '📸 Фото отчёт', price: 200, icon: '📸' }
  ];

  const calculatePrice = () => {
    if (!weight || !distance || !cargoType || !vehicleType || !urgency) return;

    const selectedVehicle = vehicleTypes.find(v => v.value === vehicleType);
    const selectedCargo = cargoTypes.find(c => c.value === cargoType);
    const selectedUrgency = urgencyLevels.find(u => u.value === urgency);
    
    if (!selectedVehicle || !selectedCargo || !selectedUrgency) return;

    const basePrice = selectedVehicle.baseRate * parseInt(distance);
    const weightPrice = parseInt(weight) * 15;
    const volumePrice = volume ? parseInt(volume) * 200 : 0;
    const cargoMultiplier = selectedCargo.multiplier;
    const urgencyMultiplier = selectedUrgency.multiplier;
    
    const servicesPrice = additionalServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    const totalPrice = (basePrice + weightPrice + volumePrice) * cargoMultiplier * urgencyMultiplier + servicesPrice;
    setCalculatedPrice(Math.round(totalPrice));
  };

  const toggleService = (serviceId: string) => {
    setAdditionalServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 shadow-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <Icon name="Zap" size={32} className="relative text-white z-10 p-1" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">🚀 КосмоГруз</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              {['Калькулятор', 'Услуги', 'Тарифы', 'Отслеживание', 'Контакты'].map((item, index) => (
                <a 
                  key={index}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 bg-yellow-400/30 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 bg-pink-400/30 rounded-full backdrop-blur-sm"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-6 animate-bounce-slow">
              🌟 Грузоперевозки будущего! 🌟
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Доставляем грузы со скоростью света! От дронов до космических кораблей 🚀 
              Рассчитайте стоимость за 10 секунд и отправляйтесь в будущее логистики!
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src="/img/6e1983cc-00c5-4678-8af1-3323aefd0ce2.jpg" 
                alt="Футуристический логистический центр"
                className="w-80 h-60 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-2xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🚀</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>📦</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>⚡</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🌟</span>
            <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🚁</span>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="калькулятор" className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">🧮 Космический калькулятор</h2>
            <p className="text-gray-600 text-lg">Получите расчёт стоимости за световую секунду! ⚡</p>
          </div>

          <Card className="creative-shadow border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <span className="text-2xl">🚀</span>
                Запуск расчёта
              </CardTitle>
              <CardDescription className="text-purple-100">
                Заполните данные для расчета стоимости межпланетной доставки
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Основные параметры */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="weight" className="text-lg font-semibold flex items-center gap-2">
                    ⚖️ Вес груза (кг)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="volume" className="text-lg font-semibold flex items-center gap-2">
                    📐 Объем груза (м³)
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="Введите объем (опционально)"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="distance" className="text-lg font-semibold flex items-center gap-2">
                    🛣️ Расстояние (км)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Введите расстояние"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    ⚡ Скорость доставки
                  </Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3">
                      <SelectValue placeholder="Выберите скорость" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="text-lg">
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    📦 Тип груза
                  </Label>
                  <Select value={cargoType} onValueChange={setCargoType}>
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3">
                      <SelectValue placeholder="Выберите тип груза" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargoTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-lg">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    🚀 Тип транспорта
                  </Label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger className="border-2 border-purple-200 focus:border-purple-400 text-lg p-3">
                      <SelectValue placeholder="Выберите транспорт" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value} className="text-lg">
                          {vehicle.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Дополнительные услуги */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  ✨ Дополнительные услуги
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <Badge
                      key={service.id}
                      variant={additionalServices.includes(service.id) ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        additionalServices.includes(service.id) 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'border-2 border-purple-200 hover:border-purple-400'
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      {service.label} <br />
                      <span className="text-xs">+{service.price}₽</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Кнопка расчёта */}
              <Button 
                onClick={calculatePrice} 
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold py-4 text-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                size="lg"
              >
                <span className="mr-3 text-2xl">🚀</span>
                Запустить расчёт!
                <span className="ml-3 text-2xl">⚡</span>
              </Button>

              {/* Результат */}
              {calculatedPrice && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-8 text-center transform animate-bounce-slow">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">Стоимость космической доставки:</h3>
                  <p className="text-5xl font-bold gradient-text mb-3">{calculatedPrice.toLocaleString()}₽</p>
                  <div className="flex justify-center space-x-2 text-2xl mb-4">
                    <span>💫</span><span>🚀</span><span>✨</span><span>🌟</span><span>⚡</span>
                  </div>
                  <p className="text-lg text-green-700">Готово к отправке в космос! 🚀</p>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3">
                    📞 Заказать доставку!
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="услуги" className="py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center gradient-text mb-4">🌟 Наши космические услуги</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Доставляем всё, от земных грузов до инопланетных артефактов!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚀', title: 'Космо-доставка', desc: 'До Марса и обратно!', color: 'from-purple-500 to-pink-500' },
              { icon: '📦', title: 'Умная упаковка', desc: 'ИИ упакует идеально', color: 'from-blue-500 to-cyan-500' },
              { icon: '🛡️', title: 'Защита от астероидов', desc: 'Полная космическая защита', color: 'from-green-500 to-emerald-500' },
              { icon: '🌍', title: 'GPS в космосе', desc: 'Отслеживание в любой галактике', color: 'from-orange-500 to-red-500' },
              { icon: '⚡', title: 'Турбо-скорость', desc: 'Быстрее скорости света', color: 'from-yellow-500 to-orange-500' },
              { icon: '🤖', title: 'Роботы-грузчики', desc: 'Автоматическая погрузка', color: 'from-indigo-500 to-purple-500' },
              { icon: '🌟', title: 'VIP доставка', desc: 'Красная дорожка для груза', color: 'from-pink-500 to-rose-500' },
              { icon: '🎯', title: 'Точность 100%', desc: 'Попадаем в цель всегда', color: 'from-teal-500 to-blue-500' }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-purple-200 bg-white/90 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg animate-float`}>
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 gradient-text">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Visual Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/img/d4260d07-5f59-41c4-91a8-8b5e62f8e71f.jpg" 
            alt="3D изометрические контейнеры"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">🌌 Добро пожаловать в будущее логистики!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Скорость света</h3>
              <p>Доставляем грузы быстрее, чем вы успеете моргнуть!</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-2">Звёздное качество</h3>
              <p>Каждая доставка — это космическое приключение!</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🛸</div>
              <h3 className="text-xl font-bold mb-2">Инопланетные технологии</h3>
              <p>Используем технологии из далёких галактик!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tariffs & FAQ */}
      <section id="тарифы" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="tariffs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <TabsTrigger value="tariffs" className="text-lg font-bold">💰 Тарифы</TabsTrigger>
              <TabsTrigger value="faq" className="text-lg font-bold">❓ FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tariffs" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicleTypes.map((vehicle, index) => (
                  <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{vehicle.emoji}</div>
                      <CardTitle className="gradient-text">{vehicle.label}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-3xl font-bold text-purple-600 mb-4">{vehicle.baseRate}₽/км</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Базовая ставка за км</li>
                        <li>• + 15₽ за каждый кг</li>
                        <li>• + 200₽ за каждый м³</li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { q: '🤔 Как рассчитывается стоимость?', a: 'Магические алгоритмы учитывают вес, расстояние, тип груза и фазы Луны!' },
                  { q: '🛡️ Есть ли защита от астероидов?', a: 'Конечно! Наши грузы защищены силовыми полями последнего поколения!' },
                  { q: '🔍 Как отследить груз в космосе?', a: 'Через квантовое приложение можно видеть груз в реальном времени!' },
                  { q: '👽 Доставляете на другие планеты?', a: 'Да! Работаем со всеми дружественными цивилизациями!' },
                  { q: '⚡ Насколько быстро доставляете?', a: 'От мгновенной телепортации до неспешных космических прогулок!' },
                  { q: '🤖 Кто грузит мои посылки?', a: 'Команда высококвалифицированных роботов под управлением ИИ!' }
                ].map((item, index) => (
                  <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-3 text-lg gradient-text">{item.q}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="контакты" className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">📞 Космическая связь</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  📱
                </div>
                <h3 className="font-bold text-lg mb-2 gradient-text">Квантовая связь</h3>
                <p className="text-gray-600">+7 (999) 888-КОСМОС</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  📧
                </div>
                <h3 className="font-bold text-lg mb-2 gradient-text">Голограмма-почта</h3>
                <p className="text-gray-600">космос@КосмоГруз.галактика</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <h3 className="font-bold text-lg mb-2 gradient-text">Режим работы</h3>
                <p className="text-gray-600">24/7 по всем галактикам</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="relative text-3xl">🚀</div>
              </div>
              <h3 className="text-3xl font-bold">КосмоГруз</h3>
            </div>
            <p className="text-purple-200 mb-6 text-lg">Доставляем мечты быстрее скорости света! ✨</p>
            <div className="flex justify-center space-x-6 text-2xl mb-6">
              <span className="animate-bounce">🌟</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🚀</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌍</span>
              <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>⚡</span>
              <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>💫</span>
            </div>
            <p className="text-purple-300">© 2024 КосмоГруз. Все права защищены силовыми полями.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;