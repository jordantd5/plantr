const db = require('./models');

const {
  vegetable: Vegetable,
  gardener: Gardener,
  plot: Plot,
  vegetable_plot: VegetablePlot,
} = db.models

let vegetables, gardeners, plots

db
  .sync({force:true})
  .then(() => {
    const vegetableData = [
      {
        name: 'Carrot',
        color: 'orange',
      }, {
        name: 'Tomato',
        color: 'red',
      }, {
        name: 'Pepper',
        color: 'green',
      },
    ]
    return Vegetable.bulkCreate(vegetableData, {returning:true})
    //postgres option returning representations of the new data
  })
  .then(createdVegetables => {
    vegetables = createdVegetables;
    const [carrot, tomato, pepper] = vegetables;
    const gardenerData = [
      {
        name: 'McGregor',
        age: 60,
        favoriteVegetableId: carrot.id,
      }, {
        name: 'Hashimoto',
        age: 37,
        favoriteVegetableId: pepper.id,
      } , {
        name: 'Giancarlo',
        age: 19,
        favoriteVegetableId: tomato.id,
      },
    ]
    return Gardener.bulkCreate(gardenerData, {returning: true})
  })
  .then (createdGardeners => {
    gardeners = createdGardeners;
    const [mcgregor, hashimoto, giancarlo] = gardeners;
    const plotData = [
      {
        size: 20,
        shaded: false,
        gardenerId: mcgregor.id,
      }, {
        size: 40,
        shaded: true,
        gardenerId: hashimoto.id,
      }, {
        size: 10,
        shaded: false,
        gardenerId: giancarlo.id,
      },
    ]
    return Plot.bulkCreate(plotData, {returning: true})
  })
  .then (createdPlots => {
    plots = createdPlots;
    const [mcgregorPlot, hashimotoPlot, giancarloPlot] = plots;
    const [carrot, tomato, pepper] = vegetables;
    const vegetablePlotData = [
      {
        vegetableId: carrot.id,
        plotId: mcgregorPlot.id,
      }, {
        vegetableId: pepper.id,
        plotId: mcgregorPlot.id,
      }, {
        vegetableId: carrot.id,
        plotId: hashimotoPlot.id,
      }, {
        vegetableId: pepper.id,
        plotId: hashimotoPlot.id,
      }, {
        vegetableId: tomato.id,
        plotId: hashimotoPlot.id,
      }, {
        vegetableId: tomato.id,
        plotId: giancarloPlot.id,
      }, {
        vegetableId: pepper.id,
        plotId: giancarloPlot.id,
      }
    ]
    return VegetablePlot.bulkCreate(vegetablePlotData);
  })
  .then(() => {
    console.log('Database synced!')
  })
  .catch(err => {
    console.log('Disaster! Something went wrong!')
    console.log(err);
  })
  .finally(() => {
  db.close()
})
