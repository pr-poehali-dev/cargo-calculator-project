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
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const cargoTypes = [
    { value: 'standard', label: 'Стандартный груз', multiplier: 1 },
    { value: 'fragile', label: 'Хрупкий груз', multiplier: 1.3 },
    { value: 'dangerous', label: 'Опасный груз', multiplier: 1.8 },
    { value: 'oversized', label: 'Негабаритный груз', multiplier: 2.2 }
  ];

  const vehicleTypes = [
    { value: 'gazelle', label: 'Газель (до 1.5т)', baseRate: 25 },
    { value: 'truck', label: 'Фура (до 20т)', baseRate: 45 }
  ];

  const services = [
    { id: 'packaging', label: 'Упаковка', price: 500 },
    { id: 'loading', label: 'Погрузка/выгрузка', price: 1500 },
    { id: 'insurance', label: 'Страхование', price: 800 }
  ];

  const calculatePrice = () => {
    if (!weight || !distance || !cargoType || !vehicleType) return;

    const selectedVehicle = vehicleTypes.find(v => v.value === vehicleType);
    const selectedCargo = cargoTypes.find(c => c.value === cargoType);
    
    if (!selectedVehicle || !selectedCargo) return;

    const basePrice = selectedVehicle.baseRate * parseInt(distance);
    const weightPrice = parseInt(weight) * 15;
    const volumePrice = volume ? parseInt(volume) * 200 : 0;
    const cargoMultiplier = selectedCargo.multiplier;
    
    const servicesPrice = additionalServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);

    const totalPrice = (basePrice + weightPrice + volumePrice) * cargoMultiplier + servicesPrice;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={28} className="text-primary" />
              <h1 className="text-xl font-bold text-gray-900">ГрузЭкспресс</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#calculator" className="text-gray-700 hover:text-primary font-medium">Калькулятор</a>
              <a href="#services" className="text-gray-700 hover:text-primary font-medium">Услуги</a>
              <a href="#tariffs" className="text-gray-700 hover:text-primary font-medium">Тарифы</a>
              <a href="#geography" className="text-gray-700 hover:text-primary font-medium">География</a>
              <a href="#tracking" className="text-gray-700 hover:text-primary font-medium">Отслеживание</a>
              <a href="#contact" className="text-gray-700 hover:text-primary font-medium">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Надежные грузоперевозки по всей России</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Быстрая доставка любых грузов с гарантией безопасности. 
            Рассчитайте стоимость за 30 секунд!
          </p>
          <div className="flex justify-center">
            <img 
              src="/img/bca229a0-5afe-4bf3-9315-132d7e80cc8d.jpg" 
              alt="Грузовой транспорт"
              className="w-64 h-48 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Калькулятор стоимости перевозки</h2>
            <p className="text-gray-600">Получите точную стоимость доставки груза</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Calculator" size={24} />
                Рассчитать стоимость
              </CardTitle>
              <CardDescription>Заполните данные для расчета стоимости перевозки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Вес груза (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Объем груза (м³)</Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder="Введите объем (опционально)"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="distance">Расстояние (км)</Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Введите расстояние"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тип груза</Label>
                  <Select value={cargoType} onValueChange={setCargoType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип груза" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargoTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Тип транспорта</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип транспорта" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((vehicle) => (
                      <SelectItem key={vehicle.value} value={vehicle.value}>
                        {vehicle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Дополнительные услуги</Label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <Badge
                      key={service.id}
                      variant={additionalServices.includes(service.id) ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1"
                      onClick={() => toggleService(service.id)}
                    >
                      {service.label} (+{service.price}₽)
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={calculatePrice} className="w-full" size="lg">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>

              {calculatedPrice && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Стоимость перевозки:</h3>
                  <p className="text-3xl font-bold text-green-600">{calculatedPrice.toLocaleString()}₽</p>
                  <p className="text-sm text-green-700 mt-2">Итоговая стоимость с учетом всех услуг</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Наши услуги</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Truck', title: 'Грузоперевозки', desc: 'Любые виды грузов' },
              { icon: 'Package', title: 'Упаковка', desc: 'Профессиональная упаковка' },
              { icon: 'Shield', title: 'Страхование', desc: 'Полная защита груза' },
              { icon: 'MapPin', title: 'Отслеживание', desc: 'GPS мониторинг 24/7' }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name={service.icon as any} size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs & Geography Section */}
      <section id="tariffs" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="tariffs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tariffs">Тарифы</TabsTrigger>
              <TabsTrigger value="geography">География</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tariffs" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicleTypes.map((vehicle, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{vehicle.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary mb-4">{vehicle.baseRate}₽/км</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Базовая ставка за километр</li>
                        <li>• + 15₽ за каждый кг</li>
                        <li>• + 200₽ за каждый м³</li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="geography" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>География доставки</CardTitle>
                  <CardDescription>Мы работаем по всей России</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Москва и МО', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Казань', 'Ростов-на-Дону'].map((city, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-8">
              <div className="space-y-4">
                {[
                  { q: 'Как рассчитывается стоимость?', a: 'Стоимость зависит от веса, объема, расстояния и типа груза.' },
                  { q: 'Есть ли страхование?', a: 'Да, мы предлагаем полное страхование груза.' },
                  { q: 'Как отследить груз?', a: 'Через личный кабинет или по номеру накладной.' }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{item.q}</h3>
                      <p className="text-gray-600">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Отслеживание груза</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="tracking">Номер накладной</Label>
                  <Input id="tracking" placeholder="Введите номер для отслеживания" />
                </div>
                <Button>
                  <Icon name="Search" size={20} className="mr-2" />
                  Отследить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Контакты</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="Phone" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="Mail" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@gruzexpress.ru</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="Clock" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Режим работы</h3>
                <p className="text-gray-600">24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Truck" size={28} className="text-primary" />
              <h3 className="text-xl font-bold">ГрузЭкспресс</h3>
            </div>
            <p className="text-gray-400 mb-6">Надежные грузоперевозки по всей России</p>
            <div className="flex justify-center space-x-6">
              <Icon name="Phone" size={20} className="text-gray-400" />
              <Icon name="Mail" size={20} className="text-gray-400" />
              <Icon name="MapPin" size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;