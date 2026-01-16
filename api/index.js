const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const SHEET_ID = '1nuaurLAgc6b-QK6mdZWzfqFFLG60h9fWQWL0AKrE2zg';
  const { annee, mois } = req.query;
  
  if (!annee) {
    return res.status(400).json({ error: 'Paramètre annee manquant' });
  }
  
  // Configuration des plages par mois
  const plages = {
    "1": "C36:AG61",   // Janvier
    "2": "C70:AG95",   // Février
    "3": "C103:AG128", // Mars (103 + 26 - 1 = 128)
    "4": "C136:AG161", // Avril
    "5": "C169:AG194", // Mai
    "6": "C202:AG227", // Juin
    "7": "AN36:BR61",  // Juillet
    "8": "AN70:BR95",  // Août
    "9": "AN103:BR128", // Septembre
    "10": "AN136:BR161", // Octobre
    "11": "AN169:BR194", // Novembre
    "12": "AN202:BR227"  // Décembre
  };
  
  try {
    let url;
    
    if (mois && plages[mois]) {
      // Si un mois spécifique est demandé
      url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${annee}&range=${plages[mois]}`;
    } else {
      // Sinon, récupérer toute la zone des congés
      url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${annee}&range=C36:BR227`;
    }
    
    const response = await axios.get(url);
    
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Feuille non trouvée' });
  }
};
