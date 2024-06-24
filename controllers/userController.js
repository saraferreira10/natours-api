let users = [
  {
    id: 1,
    name: 'Jennifer Hardy',
    email: 'jennifer@example.com',
    role: 'guide',
    active: true,
    photo: 'user-6.jpg',
  },
];

exports.getAllUsers = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: { users } });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;

  const user = users.find((e) => e.id == id);

  if (!user)
    return res.status(404).json({ status: 'fail', message: 'user dont found' });

  res.status(200).json({ status: 'success', data: { user } });
};

exports.postUser = (req, res) => {
  const user = Object.assign({ id: users.length + 1 }, req.body);
  users.push(user);
  res.status(201).json({ status: 'success', data: { user } });
};

exports.deleteUser = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  if (users.length < id || isNaN(id))
    return res.status(404).json({ status: 'fail', message: 'user dont found' });

  users = users.filter((user) => user.id != id);
  res.status(204).json({ status: 'success', data: null });
};
