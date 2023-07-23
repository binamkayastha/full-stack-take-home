require "rails_helper"

RSpec.describe "Mutations::EditChatroom", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 2) }

  let(:description) { nil }
  let(:resolved) { nil }

  let(:variables) do
    {
      id:,
      description:,
      resolved:,
    }.to_json
  end

  let(:query) do
    <<~GQL
      mutation EditChatroom(
        $id: ID!
        $description: String
        $resolved: Boolean
      ) {
        editChatroom(
          input: {
            id: $id
            description: $description
            resolved: $resolved
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

  context "raises error if required id variable not defined" do
    let(:id) { nil }
    let(:description) { "New Description" }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end

  context "raises error if both description and resolved are not set" do
    let(:id) { chatrooms[0]['id'] }

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
      chatroom = Chatroom.find(response_json['data']['editChatroom']['chatroom']['id'])
      expect(chatroom.id).to eq(chatrooms[0]['id'])
      expect(chatroom.description).to eq("New Description")
    end
  end

  context "when resolved is set to true for chatroom 1" do
    let(:id) { chatrooms[1]['id'] }
    # The factor defaults to false, so this changes the value to true
    let(:resolved) { true }

    it "updates resolved field for chatroom 1" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      chatroom = Chatroom.find(response_json['data']['editChatroom']['chatroom']['id'])
      expect(chatroom.id).to eq(chatrooms[1]['id'])
      expect(chatroom.resolved).to eq(true)
    end
  end

  context "when both description and resolved given" do
    let(:id) { chatrooms[0]['id'] }
    let(:description) { "New Description" }
    # The factor defaults to false, so this changes the value to true
    let(:resolved) { true }

    it "updates both fields" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      chatroom = Chatroom.find(response_json['data']['editChatroom']['chatroom']['id'])
      expect(chatroom.id).to eq(chatrooms[0]['id'])
      expect(chatroom.description).to eq("New Description")
      expect(chatroom.resolved).to eq(true)
    end
  end
end
