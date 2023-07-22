module Mutations
  class EditChatroomDescription < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: true

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(id:, description:)
      params = { id:, description: }.compact_blank
      chatroom = Chatroom.find_by(id: id)
      chatroom.update(description: description)

      {
        chatroom: chatroom
      }
    end
  end
end
