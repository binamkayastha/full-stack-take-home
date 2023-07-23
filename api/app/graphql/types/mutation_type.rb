module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :edit_chatroom, mutation: Mutations::EditChatroom
  end
end
