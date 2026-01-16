const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const SHEET_ID = '1nuaurLAgc6b-QK6mdZWzfqFFLG60h9fWQWL0AKrE2zg';
  const { annee } = req.query;
  
  if (!annee) {
    return res.status(400).json({ error: 'Paramètre annee manquant' });
  }
  
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${annee}`;
    const response = await axios.get(url);
    
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Feuille non trouvée' });
  }
};
