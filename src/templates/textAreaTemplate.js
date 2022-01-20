export default `<form id='form'>
  <fieldset id="set">
    <legend>Форма для вставки текста и перевода</legend>
    <label for="en">Вставьте английский текст</label>
    <p><textarea id="en" rows="10" cols="115" class="area" placeholder="This is the story..."></textarea></p>
    <label for="ru">Вставьте перевод</label>
    <p><textarea id="ru" rows="10" cols="115"" placeholder="Это история..."></textarea></p>
    <div class="buttons">
      <button type="submit" id="button1" class="button" disabled >Приступить к печати</button>
      <button type="submit" id="button2" class="button" disabled >Сохранить результаты</button>
    </div> 
  </fieldset>
</form>
`

