function WeatherApp() {
  return (
    <section className="container">
      <div className="content">
        <h1>35°</h1>
        <div className="content__city">
          <h3>Toshkent Shahri</h3>
          <span>10:36 - Tuesday, 22 Oct 19</span>
        </div>
        <div className="weather__image">
          <div>
            <img src="https://openweathermap.org/img/wn/01d@4x.png" alt="sun" />
          </div>
          <span>Clear</span>
        </div>
      </div>
    </section>
  );
}

export default WeatherApp;
