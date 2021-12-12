# ProdTest Web
End-to-End API testing tool with **no code**

## Nedir?
ProdTest API uygulamalarına kod yazmadan e2e (end-to-end) test eklemeyi sağlayan bir araçtır. Projenize senaryo bazlı testleri hızlıca ekleyerek web servislerinizin doğru biçimde çalıştığınızdan emin olabilirsiniz.

## Özellikler
* Platform içerisinde birden fazla kullanıcı oluşturabilirsiniz.
* Projelerinizin ayrı ayrı oluşturarak, senaryolarınızın karışıkasını önleyebilirsiniz.
* Projelere bağlı şekilde "environment variables" oluşturarak, farklı ortamlarda (development, production vb.) testlerinizi çalıştırabilirsiniz.
* Sadece başarılı senaryoları değil, hata senaryolarını da izleyebilirsiniz. (404, 422, 500 gibi hata kodlarını gereken olarak cevap olarak belirleyebilirsiniz)
* GET, POST, PUT, DELETE vb. gibi bir çok HTTP methodu destekler, bu sayede bütün aksiyonlarınızı test edebilirsiniz.
* Projelerdeki ve caselerdeki son kontrol zamanıyla birlikte en son işlemde alınan cevabın başarılı veya hatalı olduğunu loglardan takip edebilirsiniz.
* Senaryodaki isteklerinizde, önceki isteklerde aldığınız cevapların data ve header verilerini kullanabilirsiniz. (Böylece ilk adımı login olan bir senaryo oluşturup, sonraki adımlara access_token içerisinde dönen veriyi taşıyabilirsiniz.)
* İsteklerinizde kolayca body içeriği gönderebilirsiniz. Platform içerisinde JSON, XML ve HTML destekleyen bir editöre sahibiz.
* AJV entegrasyonumuz sayesinde isteklere validasyon ekleyebilirsiniz. Eğer beklentinizin dışında bir veri gelirse, adım fail olacaktır.
* Senaryolarınızda adım eklemesini yaptıktan sonra sürükle bırak yaparak senaryo sırasını kolaylıkla değiştirebilirsiniz.
* Senaryo içerisinde bir adı başarısız olursa, senaryo çalışmayı durduracak ve sonraki adımların çalışmamasını sağlayacaktır.
* Platform içerisinde multi language desteği mevcuttur. Varsayılan dil İngilizce olsa da istediğiniz dilleri çeviri dosyasını düzenleyerek platforma entegre edebilirsiniz.

## Kurulum
Geliştirme ortamında client projesini ayağa kaldırmadan prodtest back-end servisimizin çalışır durumda olduğundan emin olunuz. [Back-end servisimizin kurulumuna buraya tıklayarak ulaşabilirsiniz.](https://github.com/prodtestapp/prodtest-server)

`Development` Projenin git üzerinden çekilmesi
```bash
$ git clone git@github.com:prodtestapp/prodtest-web.git
$ cd prodtest-web
```

`Development` dotenv ile prodtest web servisinin adresinin belirtilmesi gerekmektedir.
```bash

$ cp .env.example .env
$ nano .env
# beklenen web servis adresi örnek olarak şu şekilde olmalıdır: http://localhost:8000/api
```

`Development` Projede paket yöneticisi olarak yarn önerilmektedir.
```bash
# gereksinimlerin yüklenmesi
$ yarn 

# NuxtJS projesini dev ortamında ayağa kaldırmak
$ yarn dev
```

`Production` NuxtJS projesini production modunda paketlemek için aşağıdaki kodu kullanabilirsiniz.
```bash
$ yarn build
$ yarn start
```

`Development` Projeyi development modunda çalıştırmak istiyorsanız eğer 3000 portu kullanımda değilse [http://localhost:3000](http://localhost:3000) adresinden projeye ulaşabilirsiniz. Port kullanımdaysa terminalinizdeki adresi kullanarak ulaşabilirsiniz.

## License
[MIT](https://github.com/prodtestapp/prodtest-web/blob/master/LICENSE)
