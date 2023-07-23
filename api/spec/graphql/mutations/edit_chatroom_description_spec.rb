require "rails_helper"

RSpec.describe "Mutations::EditChatroomDescription", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 2) }

  let(:variables) do
    {
      id:,
      description:,
    }.to_json
  end

  let(:query) do
    <<~GQL
      mutation EditChatroomDescription(
        $id: ID!
        $description: String!
      ) {
        editChatroomDescription(
          input: {
            id: $id
            description: $description
          }
        ) {
          chatroom {
            id
            label
            description
            callerPhoneNumber
            natureCode {
              id
              name
            }
          }
        }
      }
    GQL
  end

  context "raises error if required variables not defined" do
    let(:id) { nil }
    let(:description) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end

  context "when description is set for chatroom 0" do
    let(:id) { chatrooms[0]['id'] }
    let(:description) { "New Description" }

    it "updates the description field for chatroom 0" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      chatroom = Chatroom.find(response_json['data']['editChatroomDescription']['chatroom']['id'])
      expect(chatroom.id).to eq(chatrooms[0]['id'])
      expect(chatroom.description).to eq("New Description")
    end
  end
end
