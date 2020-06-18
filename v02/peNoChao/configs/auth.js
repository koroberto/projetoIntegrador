module.exports = (req, res, next) => {
    const { jogador } = req.session;
    // console.log(jogador)
    if (!jogador) {
      return res.redirect("/");
    }
    //colocando o objeto jogador para ser usado na renderização container atletaPerfil 
    // esse res.locals fica vizivel em todas views
    res.locals.jogador = jogador;
    // console.log("locals", jogador)
    return next();
  };