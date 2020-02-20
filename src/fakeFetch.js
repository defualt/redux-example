function delay(){
  return new Promise(resolve => setTimeout(resolve,1000));
}

const posts = [
  {
    title: 't1',
    body: 'b1',
  },
  {
    title: 't2',
    body: 'b2',
  },
];

export async function fakePost(data){
  await delay();
  posts.unshift(data);
}

export async function fakeGet(data){
  await delay();
  return posts;
}