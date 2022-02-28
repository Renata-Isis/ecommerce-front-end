let quantidadeProduto = 1;
let cart = [];
let produtoKey = 0;
const elemento = (el)=> document.querySelector(el);
const elementos = (el)=> document.querySelectorAll(el);


produtos.map((item, index) => {
    let produtoItem = elemento(".models .produto-item").cloneNode(true);

    produtoItem.setAttribute('data-key', index);
    produtoItem.querySelector('.produto-item--img img').src = item.img;
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name;
    produtoItem.querySelector('.produto-item--price').innerHTML = `${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
    produtoItem.querySelector('.produto-item--desc').innerHTML = item.description;
    produtoItem.querySelector('.produto-item--juros').innerHTML = item.juros;
    produtoItem.querySelector('.btn-abrir-modal').addEventListener('click', (event)=> {
        event.preventDefault();
        let key = event.target.closest('.produto-item').getAttribute('data-key');
        quantidadeProduto = 1;
        produtoKey = key;

        elemento('.produtoBig img').src = produtos[key].img;
        elemento('.produtoInfo h1').innerHTML = produtos[key].name;
        elemento('.produtoInfo--desc').innerHTML = produtos[key].description;
        elemento('.produtoInfo--juros').innerHTML = produtos[key].juros;
        elemento('.produtoInfo--actualPrice').innerHTML = `${produtos[key].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
      
        elemento('.produtoInfo--qt').innerHTML = quantidadeProduto;

        let modal = elemento('.produtoWindowArea');
        modal.classList.add('ativo');
        elemento('.produtoWindowArea').style.display = 'flex';
       
    });

    elemento('.produto-area').append(produtoItem);

});

function closeModal() {
    elemento('.produtoWindowArea').style.display = 'none';
};

elementos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

elemento('.produtoInfo--qtmenos').addEventListener('click', ()=> {
    if(quantidadeProduto > 1) {
        quantidadeProduto--;
        elemento('.produtoInfo--qt').innerHTML = quantidadeProduto;
    };
});

elemento('.produtoInfo--qtmais').addEventListener('click', ()=> {
    quantidadeProduto++;
    elemento('.produtoInfo--qt').innerHTML = quantidadeProduto;
});

elemento('.produtoInfo--addButton').addEventListener('click', ()=> {
    let identifier = produtos[produtoKey].id+"@";
    let key = cart.findIndex((item)=> item.identifier == identifier);
    
    if(key > -1) {
        cart[key].qt += quantidadeProduto;
    } else {
        cart.push({
            identifier,
            id:produtos[produtoKey].id,
            qt:quantidadeProduto
        });
    };
    
    updateCart();
    closeModal();
});

elemento('.produtoInfo--addButton').addEventListener('click', ()=> {
    if(cart.length > 0) {
        elemento('aside').style.height = '100vh';
    };
});

elemento('.menu-openner-container').addEventListener('click', (event)=> {
    event.preventDefault();
    if(cart.length > 0) {
        elemento('aside').style.height = '100vh';
    };
});

elemento('.menu-closer').addEventListener('click', ()=> {
    elemento('aside').style.height = '0vh';
});

function updateCart() {
    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    let produtoArea = elemento('.produto-area');

    elemento('.menu-openner-container span').innerHTML = cart.length;
    
    if(cart.length > 0) {
        elemento('aside').classList.add('show');
        produtoArea.style.display = 'flex'
        elemento('.cart').innerHTML = ''
        for(let i in cart) {
            let produtoItem = produtos.find((item)=> item.id == cart[i].id);

            subtotal += produtoItem.price * cart[i].qt;

            let cartItem = elemento('.models .cart--item').cloneNode(true);

            cartItem.querySelector('img').src = produtoItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = produtoItem.name;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=> {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=> {
                cart[i].qt++
                updateCart();
            });


            elemento('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        elemento('.subtotal span:last-child').innerHTML = `${subtotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
        elemento('.desconto-total span:last-child').innerHTML = `${desconto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
        elemento('.total span:last-child').innerHTML = `${total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`
    } else {
        elemento('aside').classList.remove('show');
    }
}

const usuarios = [
    {   
        idCliente : 1,
        nome: 'João Silva',
        email:'j-silva@gmail.com',
        senha: '123456'
    },
    {
        idCliente : 2,
        nome: 'Pedro Rodrigues',
        email:'pedro_rodrigues@gmail.com',
        senha: '1234567'
    },
];

let login = elemento('.entrar-login');
let dropdown =  elemento('.dropdown-menu');
let email = elemento('#email');
let containerLogin = elemento('.container-login');
let loginCadastro = elemento('.cadastro-login');
let btnEnviar = elemento('#btnEnviar');

login.addEventListener('click', (event)=> {
    event.preventDefault();
    containerLogin.classList.add('ativo');
});

btnEnviar.addEventListener('click', (event)=> {
    event.preventDefault();
    usuarios.forEach((item)=> {
        if(item.email === email.value) {
            loginCadastro.innerHTML = 'Seja Bem-Vindo(a) :<br/>' + item.nome
        } 
    });

    containerLogin.classList.remove('ativo');
    dropdown.style.display = 'none';
    
});


const btnMobile = document.querySelector('.btn-mobile');
let main = document.querySelector('main');

    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        const nav = document.querySelector('.navegacao');
        nav.classList.toggle('ativo');
        const ativo = nav.classList.contains('ativo');
        event.currentTarget.setAttribute('aria-expanded', ativo);
        if(ativo) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
            main.style.display = 'none'
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
            main.style.display = 'block'
        };
        
    };

    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);

