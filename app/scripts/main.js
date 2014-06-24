var lastElem;

$('body').scrollspy({ target: '#header' });

// Ecouter le moment ou on vient cliquer sur tout lien
// ayant la class .togglePanier
$('.togglePanier').click(function(){
	// Cacher le panier
	$('#panier li').slideToggle(400);

	$('#panier').toggleClass('invisible');

	if( $('#panier').hasClass('invisible') ){
		$('.togglePanier').text('Afficher le panier');
	} else { 
		$('.togglePanier').text('Masquer le panier');
	}
});



// on attend que la page soit prête
$(function(){

	// et quand c'est le cas on execute cette fonction

	// Utiliser jquery pour selectionner les li du panier
	// // et leur ajouter un signe multiplication pour fermer l'élément
	$('#panier li').append('<span class="btn-close">&times;</span>');

	// Ajouter un écouteur sur les boutons en forme de croix pour fermer le li parent
	$( document ).on( 'click', '#panier li .btn-close', function(){
		lastElem = $(this);
		$("#modal").toggle();
	} );

	// Ajouter l'élément dans lequel on va afficher le total du panier
	$('#panier').closest('div').append('<div class="totalPanier"><strong>Total : </strong><span class="total"></span> €</div>');

	// Maintenant que l'élément est ajouté, on peut actualiser le total
	actualiserTotalPanier();

	// Cacher les modales si nécessaire
	$('#modal').hide();

	$('#modal #modal-back').click(function(){
		cancel();
	})

})


function actualiserTotalPanier(){
	var $li = $('#panier li'),
		total = 0;

		// faire une boucle
		$li.each(function(i, e){
			var $e = $(e),
				combien,
				prix;

				combien = $e.find('.value').text();
				prix = $e.find('.price').text().replace('€', '');
			

			total = total + (combien * prix);
		});

		// LA BOUCLE EST TERMINÉE
		$('.totalPanier .total').text(total);


}


function ok(){
	$('#modal').toggle();


	$li = lastElem.closest('li');
	$li.slideToggle().addClass('hidden');
	$li.find('.value').text(0);

	actualiserTotalPanier();

}

function cancel(){
	$('#modal').toggle();
}



