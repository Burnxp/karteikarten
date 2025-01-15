$(function(){
    $('footer').html(`&copy;2025 Karteikarten <a href="impressum.html">Impressum</a> <a href="datenschutz.html">Datenschutz</a><br>
      Letzte Aktuallisierung: 14.01.2024 <br>`)

      $('.info').hide();
      $('.inhalt').on('click', function(){
          $(this).next().slideToggle();
      })
      .css('cursor', 'pointer')

      
      $('a[href="#"]').parent().css('backgroundColor','#ecf2f585')
})