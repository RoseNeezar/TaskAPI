const Card = require("./../models/cardModel");
const List = require("./../models/listModel");
const catchAsync = require("./../utils/catchAsync");

exports.createCard = catchAsync(async (req, res, next) => {
  const { title, listId, cardId } = req.body;
  await Card.find().exec();
  const newCard = new Card({
    title,
    list: listId,
    cardId,
  });
  const result = await newCard.save();
  const list = await List.findOne({ listId }).exec();
  if (!list) {
    return res
      .status(404)
      .json({ message: "List of provided id doesn't exist" });
  }
  const newCardIds = Array.from(list.cardIds);
  newCardIds.push(result.cardId);
  list.set({ cardIds: newCardIds });
  const result2 = await list.save();
  return res.status(201).json({
    message: "new card is created and also cardIds in listId is also updated",
    card: result,
    list: result2,
  });
});

const findAllCards = (listId) =>
  Card.find({ list: listId }).select("cardId title list");

exports.getAllCards = catchAsync(async (req, res) => {
  const { listIds } = req.body;

  let totalCards = [];
  if (listIds && listIds.length > 0) {
    let i = 0;
    for (const listId of listIds) {
      const cards = await findAllCards(listId);

      if (cards.length > 0) {
        totalCards.push(cards);
      }
    }
    res.status(200).json({ message: "Success", cards: totalCards });
  }
});

exports.updateCardTitle = catchAsync(async (req, res) => {
  const { cardId } = req.params;

  const card = await Card.findOneAndUpdate(
    { cardId: cardId },
    {
      title: req.body.title,
    },
    { new: true }
  ).select("-__v");
  if (!card) {
    return res
      .status(404)
      .json({ message: "unable to find card of provided Id " });
  }
  return res.status(201).json({ status: "success", data: card });
});

exports.updateCardSameList = catchAsync(async (req, res, next) => {
  const { sameListId, sameListCardIds } = req.body;
  console.log(sameListId, sameListCardIds);
  const list = await List.findOne({ listId: sameListId });
  if (!list) {
    return res
      .status(404)
      .json({ message: "unable to find List of provided id" });
  }
  list.set({ cardIds: sameListCardIds });
  const savedList = await list.save();

  return res
    .status(200)
    .json({ message: "same List reorder success", savedList });
});

exports.updateCardDifferentList = catchAsync(async (req, res, next) => {
  const {
    removedListId,
    addedListId,
    removedListCardIds,
    addedListCardIds,
  } = req.body;
  if (
    !(removedListId && addedListId && removedListCardIds && addedListCardIds)
  ) {
    return res.status(400).json({ message: "some fields are missing" });
  }
  console.log(req.body);
  const removedlist = await List.findOne({ listId: removedListId });
  removedlist.set({ cardIds: removedListCardIds });
  const removeLists = await removedlist.save();

  const addedlist = await List.findOne({ listId: addedListId });
  addedlist.set({ cardIds: addedListCardIds });
  const addedLists = await addedlist.save();

  res.status(200).json({
    message: "different list reorder success",
    removeLists,
    addedLists,
  });
});

exports.deleteCard = catchAsync(async (req, res, next) => {
  const { cardId } = req.params;
  await Card.find({ cardId: cardId }).deleteOne().exec();
  await List.update({ cardIds: cardId }, { $pull: { cardIds: cardId } });

  res.status(200).json({
    status: "Success",
  });
});
