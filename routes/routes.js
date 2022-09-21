const db = require('../database/connection');
const express = require('express');
const router = express.Router();
// importação doscontrolers utilizados nas rotas

const AlternativasController = require ('../controllers/alternativasController');

const ComentariosController = require ('../controllers/comentariosController');

const FavoritosController = require ('../controllers/favoritosController');

const GeneroController = require ('../controllers/generoController');

const ImagemController = require ('../controllers/imagemController');

const JogGeneroController = require ('../controllers/JogGeneroController');

const JogoPlataformaController = require ('../controllers/JogoPlataformaController');

const JogosController = require ('../controllers/jogosController');

const PerguntasController = require ('../controllers/perguntasController');

const PlataformaController = require ('../controllers/plataformaController');

const QuizController = require ('../controllers/quizController');

const TblLikeController = require ('../controllers/TblLikeController');

const UsuarioController = require ('../controllers/usuarioController');

// definição de rotas


router.get('/alternativas', AlternativasController.listarAlternativas);

// editar
// excluir


router.get('/comentarios', ComentariosController.listarComentarios);


// cadastrar
// editar
// excluir

router.get('/favoritos', FavoritosController.listarFavoritos);
router.post('/favoritos', FavoritosController.create);
// editar
// excluir

router.get('/genero', GeneroController.listarGenero);

// cadastrar
// editar
// excluir

router.get('/imagem', ImagemController.listarImagem);

router.post('/imagem', ImagemController.create);
// editar
// excluir

router.get('/joggenero', JogGeneroController.listarJogGenero);

// cadastrar
// editar
// excluir

router.get('/jogoplataforma', JogoPlataformaController.listarJogoPlataforma);

// cadastrar
// editar
// excluir

router.get('/jogos', JogosController.listarJogos);

router.post('/jogos', JogosController.create);
// editar
// excluir

router.get('/perguntas', PerguntasController.listarPerguntas);

// cadastrar
// editar
// excluir

router.get('/plataforma', PlataformaController.listarPlataforma);

// cadastrar
// editar
// excluir

router.get('/quiz', QuizController.listarQuiz);

// cadastrar
// editar
// excluir

router.get('/tbllike', TblLikeController.listarTblLike);

// cadastrar
// editar
// excluir

router.get('/usuario', UsuarioController.listarUsuario);
router.post('/usuario', UsuarioController.create);

// cadastrar
// editar
// excluir


module.exports = router;